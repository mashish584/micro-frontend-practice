import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";

// Create Mount function
const mount = (el) => {
    ReactDOM.render(<App/>,el);
}

//Check if we're in development mode to render the application in isolation
if(process.env.NODE_ENV === "development"){
    const rootElement = document.querySelector("#marketing-root");

    if(rootElement){
        mount(rootElement);
    }
}


//Make mount function available for container
export {mount};