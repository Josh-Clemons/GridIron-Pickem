import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { red } from "@mui/material/colors";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: red[500]
        }
    },
});


root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);