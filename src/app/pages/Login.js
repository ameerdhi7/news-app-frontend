import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useNavigate} from "react-router-dom";
import {Formik, Field, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {login} from "../slices/auth";
import {clearMessage} from "../slices/message";

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {isLoggedIn} = useSelector((state) => state.auth);
    const {message} = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue) => {
        const {email, password} = formValue;
        setLoading(true);
        dispatch(login({email, password}))
            .unwrap()
            .then(() => {
                navigate("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    if (isLoggedIn) {
        return <Navigate to="/profile"/>;
    }

    return (
        <div className={"row justify-content-center align-items-center"}>
            <div className="col-md-5">
                <div className="card card-container p-3 py-5">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleLogin}
                    >
                        {({errors, touched}) => (
                            <Form>
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
                                            (errors.password && touched.password ? " is-invalid" : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>

                                <div className="row justify-content-center mt-3">
                                    <div className="col-auto">
                                        <div className="form-group">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                                disabled={loading}
                                            >
                                                {loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <span>Login</span>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    );
};

export default Login;
