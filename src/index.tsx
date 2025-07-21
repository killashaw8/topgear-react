import React from 'react';
import {createRoot} from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import ContextProvider from './app/context/ContextProvider';
import { ThemeProvider } from 'styled-components';
import theme from './app/MaterialTheme';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App /> 
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
