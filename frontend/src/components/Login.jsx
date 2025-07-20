import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { setCredentials } from '../slices/authSlice.jsx'
import useAuth from '../hooks/index.jsx'
import { useLoginMutation } from '../services/chat.js'

const LoginPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const { t } = useTranslation()

  const inputRef = useRef()
  const [authFailed, setAuthFailed] = useState(false)
  const dispatch = useDispatch()

  const [login, { isLoading, error }] = useLoginMutation()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false)

      const res = await login(values)
      if (res.error) {
        formik.setSubmitting(false)
        if (res.error.status === 401) {
          setAuthFailed(true)
          inputRef.current.select()
          return
        }
        if (error.status === 'FETCH_ERROR') {
          toast.error(t('toasts.networkError'))
        }
        else {
          toast.error(t('toasts.loadingError'))
        }
      }

      const { username, token } = res.data
      localStorage.setItem('user', JSON.stringify({ username, token }))
      dispatch(setCredentials({ username, token }))
      auth.logIn()
      navigate(location.state?.from || '/')
    },
  })

  return (
    <>
      <h3>{t('login.title')}</h3>

      <div className="container-fluid">
        <div className="row justify-content-center pt-5">
          <div className="col">
            <Form onSubmit={formik.handleSubmit} className="p-3">
              <fieldset>
                <Form.Group>
                  <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{t('login.errors.invalidCredentials')}</Form.Control.Feedback>
                </Form.Group>
                <Button disabled={isLoading} type="submit" variant="outline-primary">{t('login.submit')}</Button>
              </fieldset>
            </Form>
            <Link to="/signup">{t('login.registerText')}</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
