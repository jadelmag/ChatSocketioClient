import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "src/components/input";
import Background from "src/components/background";
import FormContainer from "src/components/formcontainer";
import { signService } from "src/services/signin.service";
import { saveUser } from "src/services/storage.serveice";
import { UserResponseInterface } from "src/interfaces/user.interface";
import { ErrorResponseInterface } from "src/interfaces/error.interface";
import "./register.scss";

export default function Register() {
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState<boolean>(true);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Name password field is required"),
      email: Yup.string().email().required("Email field is required"),
      password: Yup.string()
        .required("Password field is required")
        .min(6, "Password six or more characters"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      const response: UserResponseInterface | ErrorResponseInterface =
        await signService(values);
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

  useEffect(() => {
    if (Object.values(formik.errors).length === 0) {
      setDisabled(false);
    }
  }, [formik.errors]);

  return (
    <div className="register">
      <Background />
      <FormContainer title="Sign in" onSubmit={formik.handleSubmit}>
        <Input
          formik={formik}
          lblText="Username"
          type="text"
          value={formik.values.username}
          placeholder="Username"
          name="username"
        />
        <Input
          formik={formik}
          lblText="Email"
          type="email"
          value={formik.values.email}
          placeholder="Email"
          name="email"
        />
        <Input
          formik={formik}
          lblText="Password"
          type="password"
          value={formik.values.password}
          placeholder="Password"
          name="password"
        />
        <Input
          formik={formik}
          lblText="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          placeholder="Confirm Password"
          name="confirmPassword"
        />
        <button disabled={disabled} type="submit">
          Create User
        </button>
        <div className="message">
          Already hace an account? <Link to="/login">Login</Link>
        </div>
      </FormContainer>
    </div>
  );
}
