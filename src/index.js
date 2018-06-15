import style from "./main.css";
import ReactDOM from "react-dom";
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import App from "./App";
ReactDOM.render(
    <BrowserRouter>
       <App/>
       </BrowserRouter>, document.getElementById("app"));