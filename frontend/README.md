# ShiftOrganizer Synchronizer
ShiftOrganizer Synchronizer is a web application that automates the process of retrieving and displaying shift schedules from the ShiftOrganizer website. It uses Selenium for web scraping and Flask for the backend, with a React frontend to present the data. The application supports user registration and login with JWT-based authentication.

## Features

- **User Registration and Login**: Users can register and log in to the application using local authentication.
- **Shift Data Retrieval**: The application logs into the ShiftOrganizer website, retrieves the current week's and next week's shifts, and displays them in the React frontend.
- **Selenium Web Scraping**: Utilizes Selenium to automate the login process and extract shift data.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Background Task**: Automatically deletes old test accounts every hour.

## Tech Stack

- **Backend**: Flask, Flask-SQLAlchemy, Flask-Bcrypt, Flask-JWT-Extended, Flask-CORS
- **Frontend**: React
- **Web Scraping**: Selenium, Chrome WebDriver

## Installation

### Prerequisites

- Python 3.7 or higher
- Node.js and npm
- Google Chrome browser
- ChromeDriver

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/shift-organizer-scraper.git
    cd shift-organizer-scraper/backend
    ```

2. Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database:
    ```bash
    flask db upgrade
    ```

5. Run the Flask application:
    ```bash
    flask run
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../frontend
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

3. Run the React application:
    ```bash
    npm start
    ```

## Usage

1. Register a new user via the `/register` endpoint or through the frontend.
2. Log in with your credentials via the `/login` endpoint or through the frontend.
3. Use the `/display_shift_data` endpoint to retrieve shift data. This requires JWT authentication.
4. View your shifts in the React frontend.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.


## Acknowledgements

- [Flask](https://flask.palletsprojects.com/)
- [React](https://reactjs.org/)
- [Selenium](https://www.selenium.dev/)
- [ShiftOrganizer](https://www.shiftorganizer.com/)
