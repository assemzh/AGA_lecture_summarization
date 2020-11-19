import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Loader from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  // console.log(promiseInProgress)
  return promiseInProgress &&
  <div style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="ThreeDots" color="white" height="100" width="100" />
  </div>
  };

ReactDOM.render(
  <React.StrictMode>
    <LoadingIndicator/>
    <App />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
