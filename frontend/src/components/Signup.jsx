import { useFormik } from 'formik';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../services/chat.js';
import { setCredentials } from '../slices/authSlice.jsx';
import useAuth from '../hooks/index.jsx';

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [signup, { isRegistering }] = useSignupMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .required()
      .min(3, t('signup.errors.usernameInvalidLength'))
      .max(20, t('signup.errors.usernameInvalidLength')),
    password: yup.string()
      .required()
      .min(6, t('signup.errors.passwordInvalidLength')),
    confirmPassword: yup.string()
      .required()
      .oneOf([yup.ref('password'), null], t('signup.errors.confirmPasswordInvalid')),
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

      if (res.error) {
        if (res.error.status === 409) {
          formik.setErrors({ username: t('signup.errors.userExisted') });
          inputRef.current.select();
          return;
        }
        if (res.error.status === 'FETCH_ERROR') {
          toast.error(t('toasts.networkError'));
        } else {
          toast.error(t('toasts.loadingError'));
        }
      }

      const { username, token } = res.data;
      localStorage.setItem('user', JSON.stringify({ username, token }));
      dispatch(setCredentials({ username, token }));
      auth.logIn();
      navigate(location.state?.from || '/');
    },
  });

  return (
    <>
      <h3>{t('signup.title')}</h3>

      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="col">
            <Form onSubmit={(e) => { e.preventDefault(); console.log(formik.errors); formik.handleSubmit(e); }} className="p-3">
              <fieldset>
                <Form.Group>
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
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
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
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
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirmPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    isInvalid={!!formik.errors.confirmPassword && formik.touched.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={isRegistering} variant="outline-primary">{t('signup.submit')}</Button>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
