
import './App.css'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MainPage } from './components/Main';
import { LoginPage } from './components/Login';
import { NotFoundPage } from './components/NotFound';
import useAuth from './hooks/index.jsx';
import React, { useState } from 'react';
import AuthContext from './contexts/index.jsx';
import { Provider } from 'react-redux'
import { store } from './store';
import { setCredentials } from './slices/authSlice.jsx';
import { useDispatch } from 'react-redux';
import { SignupPage } from './components/Signup.jsx';
import {Header} from './components/Header.jsx';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ru, en } from './locales.js';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const rollbarConfig = {
  accessToken: '467b2df1aaf84b9e9af299ff01587c25f759fa2bb8e28ff7d7b39313f3496a0071212625c962fa0424fca77711820026',
  environment: 'testenv',
  captureUncaught: true,
  captureUnhandledRejections: true,
};


const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    dispatch(setCredentials({username: user.username, token: user.token}));
  }

  const [loggedIn, setLoggedIn] = useState(Boolean(user && user.token));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

function App() {

  i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      ru,
      en,
    },
    lng: "ru", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

  return (
    <Provider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <AuthProvider>
            <BrowserRouter>
              <Header />

              {/* Тосты здесь, вне Routes */}
              <ToastContainer position="top-right" autoClose={3000} />

              <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route 
                  path="/" 
                  element={
                    <PrivateRoute>
                      <MainPage />
                    </PrivateRoute>
                  } 
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Routes>

              
            </BrowserRouter>
          </AuthProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </Provider>
  );
}

export default App
