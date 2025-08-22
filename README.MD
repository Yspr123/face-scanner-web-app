setup backend for flask app to run

1. Clone the repository:
   ```sh
   git clone https://github.com/Yspr123/face-scanner-web-app.git
   cd face-scanner/backend
   ```
2. Create and activate the Python virtual environment:
   ```sh
   python3 -m venv env
   source ./env/bin/activate
   ```
copy the env example to .env for your own version
cp .env-example .env

3. Install dependencies on Linux:
   ```sh
   sudo apt-get update
   sudo apt-get install build-essential cmake
   sudo apt-get install libgtk-3-dev
   sudo apt-get install libboost-all-dev
   ```

4. Install the required Python packages:
   ```sh
   pip3 install -r requirements.txt
   ```


now run the app
```python3 app.py```


now on a new terminal run frontend react app

cd ..
cd frontend


npm i

go to the file api.js and update the apibaseurl to localhost:5000

npm run dev

this will run the front end react app on port 3000

go to the webstire landing page crete a new user and also create a login id and after login click on register face


