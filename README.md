# dont-touch-your-face
 Don't touch your face

- Introduction:
This app runs on website. Display WARNING when user touchs their face.
This app don't save any information of user.

- Technology:
1. TensorflowJS
 - @tensorflow-models/mobilenet
 - @tensorflow-models/knn-classifier
2. ReactJS

- How I build this app:
Step 1: Install nodejs
web: https://nodejs.org/en/download/
I'm using Linux Ubuntu, so I can use this command:
    sudo apt install nodejs
    sudo apt install npm
After that, we can check the version of nodejs using command below
    node -v (check version of nodejs)
    npm -v  (node package manager) 
    npx -v  (node package execute)

Step 2: Create React app
To create a project with ReactJS lib, use command below:
    npx create-react-app <your_dir>
Example: npx create-react-app dont_touch_my_face
After build-process is finished, cd to <your_dir> and run this:
    npm start

Step 3: Modify your website interface [Optional]

Step 4: Install dependencies
TensorFlow Federated (TFF) is an open-source framework for machine learning and other computations on decentralized data.
Model:
+ MobileNet: Classify images with labels from the ImageNet database.
+ KNN Classifier: This package provides a utility for creating a classifier using the K-Nearest Neighbors algorithm. Can be used for transfer learning.
To install these models, run this:
    npm i @tensorflow-models/mobilenet @tensorflow-models/knn-classifier
To use audio in this project, we also need to install "howler.js"L
    npm i howler

Ref: 
https://github.com/tensorflow/tfjs-models
https://github.com/goldfire/howler.js/

Update: run "npm set audit false" when have error "Found 4 vulnerabilities on npm install"