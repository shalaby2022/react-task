import "./login.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      Email: "",
      Password: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Invalid email address")
        .required("Email Required"),
      Password: Yup.string()
        .max(25, "Must be 25 characters or less")
        .min(8, "Must be 8 characters or More")
        .required("Password Required"),
    }),
    onSubmit: (values) => {
      let info = users.find((item) => item.email === values.Email);
      if (info) {
        localStorage.setItem("user", JSON.stringify(values.Email));
        navigate("/react-task/");
      } else {
        alert("Please enter a valid email address");
      }
    },
  });

  useEffect(() => {
    const fetchUsers = () => {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then(({ data }) => setUsers(data));
    };
    fetchUsers();
  }, []);

  return (
    <div className="wrapper">
      <div className="backGround"></div>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="content">
          <h1 className="header">Sign in</h1>

          <input
            type="email"
            placeholder="Email"
            value={formik.values.Email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="Email"
            name="Email"
          />
          {formik.touched.Email && formik.errors.Email && (
            <h6 className="error">{formik.errors.Email}</h6>
          )}

          <input
            type="password"
            placeholder="Password"
            value={formik.values.Password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="Password"
            name="Password"
          />
          {formik.touched.Password && formik.errors.Password && (
            <h6 className="error">{formik.errors.Password}</h6>
          )}

          <p className="forgot">Forgot password ?</p>
          <button onClick={formik.handleSubmit} type="submit">
            Sign in
          </button>

          <p className="create">
            Not registerd yet ?<span> Create an account</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
