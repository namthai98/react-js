// import logo from './logo.svg';
import React, { useEffect, useRef } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet'
import * as knnClassifier from '@tensorflow-models/knn-classifier'
import {Howl, Howler} from 'howler';
import './App.css';
import soundURL from './assets/voice.mp3';

// var sound = new Howl({
//   src: [soundURL]
// });
// sound.play();

function App() {
  //setup camera
  const video = useRef();
  const init = async () => {
    console.log('init...');
    await setupCamera();
    console.log('Connect to camera succesful...');
  }

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
      <button className="btn">Train 1</button>
      <button className="btn">Train 2</button>
      <button className="btn">Run</button>
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