import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0B132B',
            paper: '#1C2541'
        },
        primary: {
            main: '#5BC0BE',
        },
        secondary: {
            main: '#757575',
        },
        text: {
            primary: '#F8F8F8'
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