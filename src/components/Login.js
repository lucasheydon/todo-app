import { React, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import jwt_decode from "jwt-decode";

function Logout() {
  localStorage.removeItem("user")
};

function Login() {
  const [user, setUser] = useState();
  const validateFields = Yup.object().shape({
    email: Yup.string().max(255).required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});

let formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: validateFields,
    onSubmit: (e) => {
    let email = e.target.email.value;
    let password = e.target.password.value;
    fetch('https://todo-apilh.herokuapp.com/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    }).then(response => {
      if(!response.ok){
      } else {
        return response.json();
      }
    }).then(data => {
      console.log(data)
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
    })
  }
});

function HandleSubmit(e){
  e.preventDefault();
  let email = e.target.email.value;
  let password = e.target.password.value;  
  fetch('https://todo-apilh.herokuapp.com/login', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(response => {
    if(!response.ok){
    } else {
      return response.json();
    }
  }).then(data => {
    console.log(data)
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
  })
}

    return (
      <div className="mb-3">
        <h3>Sign In</h3>
        <form
          onSubmit={HandleSubmit}
          id="loginForm"
          className="w-100 d-flex flex-column justify-content-center align-items-center"
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email Address"
            className="form-control"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <FontAwesomeIcon icon={faUser} id="userIcon" />
          {formik.errors.email && formik.touched.email ? (
          <p>{formik.errors.email}</p>
          ) : null}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            className="form-control"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          <FontAwesomeIcon icon={faLock} id="passIcon" />
          {formik.errors.password && formik.touched.password ? (
          <p>{formik.errors.password}</p>
          ) : null}
        <p className="no-account text-right">
          Don't have an <a href="/register">account?</a>
        </p>          
        <input
            type="submit"
            id="loginBtn"
            className="btn"
            value="Sign in"
          />
          <p className="small-text text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
        <button id="logout" onClick={Logout} >Logout</button>

      </div>
    );
  }

export default Login;
