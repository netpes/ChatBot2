import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import GetDataProvider from "./values";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <BrowserRouter>
          <GetDataProvider>
    <App />
          </GetDataProvider>
      </BrowserRouter>
  </React.StrictMode>

);

