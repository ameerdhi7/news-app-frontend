import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {register} from "../slices/auth";
import {clearMessage} from "../slices/message";

const Register = () => {
    const [successful, setSuccessful] = useState(false);

    const {message} = useSelector((state) => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .test(
                "len",
                "The name must be between 3 and 20 characters.",
                (val) =>
                    val && val.toString().length >= 3 && val.toString().length <= 20
            )
            .required("This field is required!"),
        email: Yup.string()
            .email("This is not a valid email.")
            .required("This field is required!"),
        password: Yup.string()
            .test(
                "len",
                "The password must be between 6 and 40 characters.",
                (val) =>
                    val && val.toString().length >= 6 && val.toString().length <= 40
            )
            .required("This field is required!"),
    });

    const handleRegister = (formValue) => {
        const {name, email, password} = formValue;

        setSuccessful(false);

        dispatch(register({name, email, password}))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });
    };

    return (
        <div className={"row justify-content-center align-items-center"}>
            <div className="col-md-5">
                <div className="card card-container p-3">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        {({errors, touched}) => (
                            <Form>
                                {!successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <Field
                                                name="name"
                                                type="text"
                                                className={
                                                    "form-control" +
                                                    (errors.name && touched.name
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="name"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Field
                                                name="email"
                                                type="email"
                                                className={
                                                    "form-control" +
                                                    (errors.email && touched.email ? " is-invalid" : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="email"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <Field
                                                name="password"
                                                type="password"
                                                className={
                                                    "form-control" +
                                                    (errors.password && touched.password
                                                        ? " is-invalid"
                                                        : "")
                                                }
                                            />
                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="invalid-feedback"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Sign Up
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>

                {message && (
                    <div className="form-group">
                        <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
