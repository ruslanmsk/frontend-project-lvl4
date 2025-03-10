import { Formik, Field, Form } from 'formik';
export const LoginPage = () => (
    <>
      <h3>Login</h3>

      <Formik 
        initialValues={{ login: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("Form is validated! Submitting the form...");
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }}
      >
        {() => (
          <Form>
            <div className="form-group">
              <label htmlFor="login">Login</label>
              <Field
                type="login"
                name="login" 
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                className="form-control"
              />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );