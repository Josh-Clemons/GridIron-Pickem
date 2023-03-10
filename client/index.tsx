import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import { Provider } from 'react-redux';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import store from "../src/redux/store";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

const theme: Theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0B132B',
            paper: '#1C2541',
        },
        primary: {
            main: '#5BC0BE',
        },
        secondary: {
            main: '#c3c3c3',
        },
        text: {
            primary: '#F8F8F8'
        }
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#0B132B'
                }
            }
        }
    }
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