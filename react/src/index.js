
import React from "react"
import App from "./App.js"
import reactDOM from "react-dom"
import './index.css'
import {BrowserRouter} from 'react-router-dom'

reactDOM.render(<BrowserRouter><App/></BrowserRouter>,document.getElementById("root"))