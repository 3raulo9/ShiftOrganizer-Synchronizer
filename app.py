from flask import Flask, render_template, request
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

app = Flask(__name__)

# Function to log in and retrieve shift data using Selenium
def get_shift_data(company_id, username, password):
    login_url = "https://app.shiftorganizer.com/login/"
    home_url = "https://app.shiftorganizer.com/app/home"

    # Set up the Selenium WebDriver options for headless execution
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")  # Bypass OS security model, necessary on certain systems
    chrome_options.add_argument("--disable-dev-shm-usage")  # Overcome limited resource problems
    chrome_options.add_argument("--disable-gpu")  # Applicable for headless mode only

    # Initialize WebDriver with options
    driver = webdriver.Chrome(options=chrome_options)  # You may need to specify the path to your chromedriver.exe

    try:
        # Perform login using Selenium
        driver.get(login_url)
        driver.find_element(By.ID, 'company').send_keys(company_id)
        driver.find_element(By.ID, 'username').send_keys(username)
        driver.find_element(By.ID, 'password').send_keys(password)
        driver.find_element(By.ID, 'log-in').click()

        # Wait for the login to complete (adjust the timeout as needed)
        WebDriverWait(driver, 10).until(EC.url_contains(home_url.split('/')[-1]))

        # Navigate to the home page
        driver.get(home_url)

        # Wait for the page content to load (adjust the timeout as needed)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'panel-body')))

        # Allow additional time for dynamic content to load
        time.sleep(1.5)  # You can adjust the sleep duration as needed

        #  Get the content using Selenium of the current week
        panel_body_element_of_the_current_week = driver.find_element(By.CLASS_NAME, 'panel')
        shift_data_of_the_current_week = panel_body_element_of_the_current_week.get_attribute('outerHTML')

        # Get the content using Selenium of the second 'panel'
        panel_elements = driver.find_elements(By.CLASS_NAME, 'panel')

        if len(panel_elements) > 1:
            shift_data = panel_elements[1].get_attribute('outerHTML')
        else:
            shift_data = "No second 'panel' found on the page"

        # Get the user name and company name separately
        user_name_element = driver.find_element(By.CSS_SELECTOR, '.pull-left.flip.text-left')
        user_name = user_name_element.text.split('\n')[0].strip()
        company_name = user_name_element.text.split('\n')[1].strip()

    finally:
        # Close the WebDriver
        driver.quit()

    return shift_data, shift_data_of_the_current_week, user_name, company_name

@app.route('/')
def interactive_form():
    num_users = request.args.get('num_users', default=1, type=int)
    return render_template('interactive_form.html', num_users=num_users)

@app.route('/display_shift_data', methods=['POST'])
def display_shift_data():
    num_users = int(request.form['num_users'])
    user_data = []

    for i in range(num_users):
        company_id = request.form[f'company_id_{i}']
        username = request.form[f'username_{i}']
        password = request.form[f'password_{i}']

        shift_data, shift_data_of_the_current_week, user_name, company_name = get_shift_data(company_id, username, password)

        user_data.append({
            'user_name': user_name,
            'company_name': company_name,
            'shift_data': shift_data,
            'shift_data_of_the_current_week': shift_data_of_the_current_week,
        })

    return render_template('display_shift_data.html', user_data=user_data)

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)
