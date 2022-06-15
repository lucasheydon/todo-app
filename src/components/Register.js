import React, { useState, useEffect } from 'react';
import { useNavigate,  BrowserRouter as Router, 
    Switch, 
    Route  } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { faAddressCard, faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner2 from "./LoadingSpinner2";


function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const validateFields = Yup.object().shape({
        fullName: Yup.string().max(255).required('First Name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be longer than 6 characters')
            .required('Password is required')
    });

    let formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: ''
        },
        validationSchema: validateFields,
        onSubmit: (formData) => {
            fetch("https://todo-apilh.herokuapp.com/user", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'access-control-allow-origin': "*"
                },
                redirect: 'follow',
                body:JSON.stringify(formData)
            }).then(response => {
                if(!response.ok){
                } else {
                  return response.json();
                }
              })
        },
    });

    if(isLoading){
        return <LoadingSpinner2 />
    } else {
    return (
        <div className='mb-3'>
            <h3>Register</h3>
            <form
                onSubmit={formik.handleSubmit}
                id="registerform"
            >
                <input
                    type='text'
                    name='fullName'
                    id='fullName'
                    placeholder='Full Name'
                    className='form-control'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                />
                <FontAwesomeIcon icon={faAddressCard} id="regNameIcon" />
                {formik.errors.fullName && formik.touched.fullName ? (
                    <p>{formik.errors.fullName}</p>
                ) : null}
                <input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Email Address'
                    className='form-control'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <FontAwesomeIcon icon={faUser} id="userIcon" />
                {formik.errors.email && formik.touched.email ? (
                    <p>{formik.errors.email}</p>
                ) : null}
                <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Password'
                    className='form-control mb-3'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <FontAwesomeIcon icon={faLock} id="regPassIcon" />
                {formik.errors.password && formik.touched.password ? (
                    <p>{formik.errors.password}</p>
                ) : null}
                <input 
                    type='submit'
                    id='regBtn'
                    className='btn'
                    value='Register'
                />
                <p className="small-text text-right">
                  Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        </div>
    );
}
}

export default Register;
