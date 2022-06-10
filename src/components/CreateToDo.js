import { useState } from "react";
import { Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingSpinner2 from "./LoadingSpinner2";
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function CreateToDo() {
    const [data, setData] = useState({ title: ""});
    const [isLoading, setIsLoading] = useState(false);
    const validateFields = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
    });

    let formik = useFormik({
        initialValues: {
            title: ''
        },
        validationSchema: validateFields,
        onSubmit: (formData) => {
        setIsLoading(true)
        fetch("http://localhost:4000/todo", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'access-control-allow-origin': "*",
            },
            redirect: 'follow',
            body:JSON.stringify(formData)
        })
        .then(response => {
            setIsLoading(false)
            if (!response.ok) {
            } else {
                return response.json();
            }
        })
    },
    });

    /*function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }*/

    /*function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        axios
            .post("http://localhost:4000/todo", data)
            .then((res) => {
                setData({ title: ""});
                console.log(res.data.message);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("Error couldn't create todo");
                console.log(err.message);
            });
    }*/

    if(isLoading){
        return <LoadingSpinner2 />
    } else {
    return (
        <section className="container">
            <Link to="/todo">
                <FontAwesomeIcon icon={faChevronLeft} id="backIcon" />
            </Link>

            <section className="contents">
                <form
                    onSubmit={formik.handleSubmit}
                    className="form-container"
                    noValidate
                >
                    <input
                        type="text"
                        name="title"
                        id='title'
                        className="input"
                        placeholder="Enter title"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    {formik.errors.title && formik.touched.title ? (
                    <p>{formik.errors.title}</p>
                    ) : null}
                    <button type="submit" id="createBtn" className="button" class="btn w-25">
                        Create
                    </button>
                </form>
            </section>
        </section>
    );
}
}