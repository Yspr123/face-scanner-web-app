# Face Scanner Web App

A web application for face registration and authentication using Flask (backend) and React (frontend).

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup (Flask)](#backend-setup-flask)
  - [Frontend Setup (React)](#frontend-setup-react)
- [Usage](#usage)
- [License](#license)

## Features

- User registration and login
- Face registration and scanning
- RESTful API backend (Flask)
- Modern React frontend

## Prerequisites

- Python 3.x
- Node.js & npm
- Git
- Linux (recommended for dependencies)

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/Yspr123/face-scanner-web-app.git
cd face-scanner-web-app/backend
```

### 2. Backend Setup (Flask)

#### a. Create and Activate Python Virtual Environment

```sh
python3 -m venv env
source env/bin/activate
```

#### b. Configure Environment Variables

Copy the example environment file and edit as needed:

```sh
cp .env-example .env
```

#### c. Install System Dependencies (Linux)

```sh
sudo apt-get update
sudo apt-get install build-essential cmake libgtk-3-dev libboost-all-dev
```

#### d. Install Python Packages

```sh
pip3 install -r requirements.txt
```

#### e. Initialize and Run the Backend

```sh
flask init-db
python3 app.py
```

### 3. Frontend Setup (React)

Open a new terminal and navigate to the frontend directory:

```sh
cd ../frontend
```

Install dependencies:

```sh
npm install
```

Update the API base URL in `api.js` to point to the backend:

```js
// In frontend/src/api.js
export const apiBaseUrl = "http://localhost:5000";
```

Start the React development server:

```sh
npm run dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

## Usage

1. Open the landing page in your browser.
2. Create a new user account.
3. Log in with your credentials.
4. Click on "Register Face" to begin face registration.

## License

This project is licensed under the MIT License.


