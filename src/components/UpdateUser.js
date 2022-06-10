import { useState } from "react";
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LoadingSpinner2 from "./LoadingSpinner2";

export function UpdateUser({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ fullName: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);
    const validateFields = Yup.object().shape({
        fullName: Yup.string().max(255),
        email: Yup.string().max(255)
    });
    
    let formik = useFormik({
        initialValues: {
            fullName: '',
            email: ''
        },
        validationSchema: validateFields
    });

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function twoChange(e) {
        handleChange(e);
        formik.handleChange();
    }

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        console.log({ _id }, { data });
        axios
            .put(`http://localhost:4000/user/${_id}`, data)
            .then((res) => {
                setData({ fullName: "", email: "" });
                console.log(res.data.message);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log("Failed to update user");
                console.log(err.message);
            });
    }

    if(isLoading){
        return <LoadingSpinner2 />
    } else {
    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleUpdate();
                handleClose();
            }}
        >
            <input
                type="text"
                name="fullName"
                id="fullName"
                className="input"
                placeholder="Edit Name"
                onBlur={formik.handleBlur}
                onChange={twoChange}
            />
            {formik.errors.fullName && formik.touched.fullName ? (
            <p>{formik.errors.fullName}</p>
            ) : null}
            <input
                type="text"
                name="email"
                id="email"
                className="input"
                placeholder="Edit Email"
                onBlur={formik.handleBlur}
                onChange={twoChange}
            />
            {formik.errors.email && formik.touched.email ? (
            <p>{formik.errors.email}</p>
            ) : null}
            <button type="submit" id="submitBtn" className="button" class="btn w-25">
                Submit
            </button>
        </form>
    );
}
}