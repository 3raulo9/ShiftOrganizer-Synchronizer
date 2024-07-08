from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import threading

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins for simplicity

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
        time.sleep(1.5)

        panel_body_element_of_the_current_week = driver.find_element(By.CLASS_NAME, 'panel')
        shift_data_of_the_current_week = panel_body_element_of_the_current_week.get_attribute('outerHTML')

        panel_elements = driver.find_elements(By.CLASS_NAME, 'panel')
        shift_data = panel_elements[1].get_attribute('outerHTML') if len(panel_elements) > 1 else "No second 'panel' found on the page"

        user_name_element = driver.find_element(By.CSS_SELECTOR, '.pull-left.flip.text-left')
        user_name_company_data = user_name_element.text.split('\n')
        user_name = user_name_company_data[0].strip() if len(user_name_company_data) > 0 else "No user name"
        company_name = user_name_company_data[1].strip() if len(user_name_company_data) > 1 else "No company name"

    finally:
        driver.quit()

    result[index] = {
        'user_name': user_name,
        'company_name': company_name,
        'shift_data': shift_data,
        'shift_data_of_the_current_week': shift_data_of_the_current_week,
    }

@app.route('/display_shift_data', methods=['POST'])
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

if __name__ == '__main__':
    app.run(debug=True, port=5000)
