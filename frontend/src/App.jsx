
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

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    dispatch(setCredentials({username: user.username, token: user.token}));
  }

  const [loggedIn, setLoggedIn] = useState(Boolean(user && user.token));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
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

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App
