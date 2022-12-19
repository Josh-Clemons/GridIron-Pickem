import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import { Provider } from 'react-redux';
import store from '../src/redux/store';

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);