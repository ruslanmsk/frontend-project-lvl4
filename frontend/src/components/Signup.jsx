import { Formik, Field, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/index.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { setCredentials } from '../slices/authSlice.jsx';
import { useDispatch } from 'react-redux';

import { useSignupMutation } from '../services/chat.js';
import * as yup from 'yup';


export const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();
  const dispatch = useDispatch();
  
  const [signup, {isRegistering}] = useSignupMutation();
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required()
      .min(3, 'Имя должно быть от 3 до 20 символов')
      .max(20, 'Имя должно быть от 3 до 20 символов'),
    password: yup.string()
      .required()
      .min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: yup.string()
      .required()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const res = await signup(values);

      if (res.error?.status === 409) {
        formik.setErrors({ username: 'Пользователь уже существует' });
        inputRef.current.select();
        return;
      }

      const {username, token} = res.data;
      localStorage.setItem('user', JSON.stringify({username, token}));
      dispatch(setCredentials({username, token}));
      auth.logIn();
      navigate(location.state?.from || '/');
    },
  });

  return (
    <>
      <h3>Registration</h3>

      <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col">
          <Form onSubmit={(e) => {e.preventDefault(); console.log(formik.errors); formik.handleSubmit(e);}} className="p-3">
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
                  isInvalid={!!formik.errors.username && formik.touched.username}
                  ref={inputRef}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.username}
                </Form.Control.Feedback>
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
                  isInvalid={!!formik.errors.password && formik.touched.password}
                  
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="confirmPassword">Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  placeholder="confirm password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="current-password"
                  isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword} 
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
    </>
  )
};