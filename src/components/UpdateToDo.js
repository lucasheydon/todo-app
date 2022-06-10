import { useState } from "react";
import axios from "axios";
import LoadingSpinner2 from "./LoadingSpinner2";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function UpdateToDo({ _id, handleClose, handleUpdate }) {
    const [data, setData] = useState({ title: ""});
    const [isLoading, setIsLoading] = useState(false);
    const validateFields = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required')
    });
    
    let formik = useFormik({
        initialValues: {
            title: ''
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
        setIsLoading(true)
        axios
            .put(`http://localhost:4000/todo/${_id}`, data)
            .then((res) => {
                setData({ title: ""});
                console.log(res.data.message);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("Failed to update todo");
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
                name="title"
                id='title'
                className="input"
                placeholder="Edit title"
                onBlur={formik.handleBlur}
                onChange={twoChange}
            />
            {formik.errors.title && formik.touched.title ? (
            <p>{formik.errors.title}</p>
            ) : null}
            <button type="submit" id="submitBtn" className="button" class="btn w-25">
                Submit
            </button>
        </form>
    );
}
}