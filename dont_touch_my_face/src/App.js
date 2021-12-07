// import logo from './logo.svg';
import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import '@tensorflow/tfjs-backend-cpu';
import {Howl, Howler} from 'howler';
import soundURL from './assets/voice.mp3';
import './App.css';

var sound = new Howl({
  src: [soundURL]
});
// sound.play();

const NOT_TOUCH_LABEL = 'not_touch';
const TOUCHED_LABEL = 'touched';
const TRAINING_TIME = 50;
const TOUCH_CONFIDENCE = 0.8;

function App() {
  const video = useRef();
  const knnClassifier_Module = useRef();
  const mobilenet_Module = useRef();

  const init = async () => {
    console.log('init...');
    await setupCamera();
    console.log('Connect to camera succesfully...');
    knnClassifier_Module.current = knnClassifier.create();
    mobilenet_Module.current = await mobilenet.load();
    console.log('Loaded TensorFlow framework...');
    //console.log('Dont touch your face and press Train 1...');
  }
  
  //setup camera
  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

      if (navigator.getUserMedia){
        navigator.getUserMedia(
          {video: true },
          stream => {
            video.current.srcObject = stream;
            video.current.addEventListener('loadeddata', resolve);
          },
          error => reject(error)
        );
      } else {
        reject();
      }
    });
  }

  const train = async label => {
    console.log(`Training to get your [${label}] face...`);
    for (let i = 0; i < TRAINING_TIME; ++i) {
      console.log(`Progress ${parseInt((i+1) / TRAINING_TIME * 100)}%`);
      await training(label);
    }
  }

  const training = label => {
    return new Promise(async resolve => {
      const embedding = mobilenet_Module.current.infer(
        video.current,
        true
      );
      knnClassifier_Module.current.addExample(embedding, label);
      await sleep(100);
      resolve();
    });
  }

  const run = async () => {
    const embedding = mobilenet_Module.current.infer(
      video.current,
      true
    );
    const result = await knnClassifier_Module.current.predictClass(embedding);

    if (
      result.label === TOUCHED_LABEL &&
      result.confidences[result.label] > TOUCH_CONFIDENCE
    ) {
      console.log('Touched');
      sound.play();
      await sleep(2000);
    } else {
      console.log('Untouched');
    }

    await sleep(200);

    run();
  }

  const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    init();

    //clean up
    return () => {

    }
  }, []);
  
  
  return (
    <div className="main">
      <h1>DON'T TOUCH YOUR FACE BY NAMTHAI98</h1>
      <video
      ref={video}
        className="video"
        autoPlay
      />

    <div className="control">
      <button className="btn" onClick={() => train(NOT_TOUCH_LABEL)}>Train 1</button>
      <button className="btn" onClick={() => train(TOUCHED_LABEL)}>Train 2</button>
      <button className="btn" onClick={() => run()}>Run</button>
    </div>
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;