from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from datetime import datetime, timedelta
import time
import threading
from threading import Thread

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    is_test_account = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# User registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    is_test_account = data.get('is_test_account', False)
    new_user = User(username=username, password=password, is_test_account=is_test_account)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully"), 201

# User login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity={'username': user.username})
        return jsonify(access_token=access_token), 200
    return jsonify(message="Invalid credentials"), 401

# Function to log in and retrieve shift data using Selenium
def get_shift_data(company_id, username, password, result, index):
    login_url = "https://app.shiftorganizer.com/login/"
    home_url = "https://app.shiftorganizer.com/app/home"
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    driver = webdriver.Chrome(options=chrome_options)
    try:
        driver.get(login_url)
        driver.find_element(By.ID, 'company').send_keys(company_id)
        driver.find_element(By.ID, 'username').send_keys(username)
        driver.find_element(By.ID, 'password').send_keys(password)
        driver.find_element(By.ID, 'log-in').click()
        WebDriverWait(driver, 10).until(EC.url_contains(home_url.split('/')[-1]))
        driver.get(home_url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'panel-body')))
        time.sleep(5)  # Increased wait time to 5 seconds
        panel_body_element_of_the_current_week = driver.find_element(By.CLASS_NAME, 'panel')
        shift_data_of_the_current_week = panel_body_element_of_the_current_week.get_attribute('outerHTML')
        panel_elements = driver.find_elements(By.CLASS_NAME, 'panel')
        shift_data = panel_elements[1].get_attribute('outerHTML') if len(panel_elements) > 1 else "No second 'panel' found on the page"
        user_name_element = driver.find_element(By.CSS_SELECTOR, '.pull-left.flip.text-left')
        user_name_company_data = user_name_element.text.split('\n')
        user_name = user_name_company_data[0].strip() if len(user_name_company_data) > 0 else "No user name"
        company_name = user_name_company_data[1].strip() if len(user_name_company_data) > 1 else "No company name"
        result[index] = {
            'user_name': user_name,
            'company_name': company_name,
            'shift_data': shift_data,
            'shift_data_of_the_current_week': shift_data_of_the_current_week,
        }
    except Exception as e:
        result[index] = {
            'error': "One of the credentials was wrong, try again"
        }
    finally:
        driver.quit()

@app.route('/display_shift_data', methods=['POST'])
@jwt_required()
def display_shift_data():
    data = request.get_json()
    num_users = int(data['num_users'])
    user_data = [None] * num_users
    threads = []
    try:
        for i in range(num_users):
            company_id = data[f'company_id_{i}']
            username = data[f'username_{i}']
            password = data[f'password_{i}']
            thread = threading.Thread(target=get_shift_data, args=(company_id, username, password, user_data, i))
            threads.append(thread)
            thread.start()
        for thread in threads:
            thread.join()
        return jsonify(user_data=user_data)
    except Exception as e:
        app.logger.error(f'Error processing request: {e}')
        return jsonify(error=str(e)), 500

@app.route('/about')
def about():
    return render_template('about.html')

def delete_old_test_accounts():
    while True:
        with app.app_context():
            threshold_time = datetime.utcnow() - timedelta(minutes=30)
            old_test_accounts = User.query.filter(User.is_test_account == True, User.created_at < threshold_time).all()
            for user in old_test_accounts:
                db.session.delete(user)
            db.session.commit()
        time.sleep(3600)  # Run this check every hour

# Start the background task
if __name__ == '__main__':
    Thread(target=delete_old_test_accounts, daemon=True).start()
    app.run(debug=True, port=5000)
