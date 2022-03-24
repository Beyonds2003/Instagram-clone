import React from "react"
import App from "./App"
import "./style.css"
import ReactDOM from "react-dom"
import {ThemeContext} from "./Context"
import {BrowserRouter as Router} from "react-router-dom"

ReactDOM.render(
<Router>
  <ThemeContext>
    <App />
  </ThemeContext>
</Router>, document.getElementById("root"))