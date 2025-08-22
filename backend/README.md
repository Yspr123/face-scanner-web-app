# Face Scanner

This project is a face recognition system using OpenCV and Dlib. It captures images from a webcam, trains a model with the captured images, and recognizes users based on the trained model.

## Requirements

- Python 3.x
- OpenCV
- Dlib
- NumPy
- SQLite3

## Installation

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

3. a- Install dependencies on Linux:
   ```sh
   sudo apt-get update
   sudo apt-get install build-essential cmake
   sudo apt-get install libgtk-3-dev
   sudo apt-get install libboost-all-dev
   ```

3. b- Install dependencies on Windows :

   1. Install Visual Studio Build Tools (C++ Compiler)

   Download and install from:
   [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
   During installation, select:
   Desktop development with C++
   This includes MSVC compiler, Windows SDK, and CMake.

   2. Install CMake

   Use Chocolatey (if available):

   choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
   or 
   Or download from: (CMake Official Site)[https://cmake.org/download/]
   
   3. Install Boost 

      Use vcpkg:

         ```git clone https://github.com/microsoft/vcpkg.git
         cd vcpkg
         bootstrap-vcpkg.bat
         vcpkg install boost:x64-windows```
4. Install the required Python packages:
   ```sh
   pip3 install -r requirements.txt
   ```

5. Download the required Dlib model files:
   - [shape_predictor_68_face_landmarks.dat](http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2)
   - [dlib_face_recognition_resnet_model_v1.dat](http://dlib.net/files/dlib_face_recognition_resnet_model_v1.dat.bz2)

6. Extract the `.bz2` files and place the `.dat` files in the `models` directory.

## Usage

1. Run the script:
   ```sh
   python3 ./face_scanner/face-scanner.py
   ```

2. Follow the prompts to either train a new user or test face recognition.


# Project Structure
```
backend/
├─ app.py
├─ requirements.txt
├─ .env.example
├─ README.md
├─ face_scanner/
│ ├─ __init__.py
│ ├─ config.py
│ ├─ db.py
│ ├─ models.py
│ ├─ face_service.py
│ └─ utils.py
└─ models/
├─ shape_predictor_68_face_landmarks.dat
└─ dlib_face_recognition_resnet_model_v1.dat
```

### Training a New User

- Enter `train` when prompted for the operation.
- Enter the user's name.
- Look into the camera for 20 seconds to capture training images.

### Testing Face Recognition

- Enter `test` when prompted for the operation.
- Look into the camera to test face recognition.

## Notes

- Ensure that the `models` directory contains the required Dlib model files.
- Adjust the recognition threshold in the `recognize_user` function for better accuracy.
- Highest accuracy achieved: 99.4%
- Face comparison is done using the cosine formula.

