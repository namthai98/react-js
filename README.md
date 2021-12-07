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
    npx create-react-app <dir>
Example: npx create-react-app dont_touch_my_face