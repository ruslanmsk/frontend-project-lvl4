import { Formik, Field, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/index.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.jsx';
import { useDispatch } from 'react-redux';

import { useLoginMutation } from '../services/chat.js';


export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();
  const [authFailed, setAuthFailed] = useState(false);
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();
  


  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);


      try {
        const res = await login(values);
        const {username, token} = res.data;
        localStorage.setItem('user', JSON.stringify({username, token}));
        dispatch(setCredentials({username, token}));
        auth.logIn();
        const { from } = location.state;
        navigate(from);
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <>
      <h3>Login</h3>

      <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={authFailed}
                  required
                  ref={inputRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={authFailed}
                  required
                />
                <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
              </Form.Group>
              <Button disabled={isLoading} type="submit" variant="outline-primary">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
    </>
  )
};