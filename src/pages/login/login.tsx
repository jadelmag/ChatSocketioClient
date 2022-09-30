import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "src/components/input";
import Background from "src/components/background";
import FormContainer from "src/components/formcontainer";
import { loginService } from "src/services/login.service";
import { saveUser } from "src/services/storage.serveice";
import { UserResponseInterface } from "src/interfaces/user.interface";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import "./login.scss";

export default function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "jadelma@gmail.com",
      password: "piticli",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email(),
      password: Yup.string(),
    }),
    onSubmit: async (values) => {
      const response: UserResponseInterface | ErrorResponseInterface =
        await loginService(values.email, values.password);
      if (response.ok) {
        const userDB = response as UserResponseInterface;
        saveUser(
          userDB.uid,
          userDB.username,
          userDB.email,
          userDB.image,
          userDB.token
        );
        navigate("/");
      } else {
        const error = response as ErrorResponseInterface;
        formik.setErrors({ email: error.msg });
      }
    },
  });

  return (
    <div className="register">
      <Background />
      <FormContainer title="Socket App" onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          lblText="Email"
          type="email"
          value={formik.values.email}
          placeholder="Email"
          name="email"
          hideError
        />
        <Input
          formik={formik}
          lblText="Password"
          type="password"
          value={formik.values.password}
          placeholder="Password"
          name="password"
        />
        <button type="submit">Login</button>
        <div className="message">
          create an account <Link to="/register">Sign in</Link>
        </div>
      </FormContainer>
    </div>
  );
}
