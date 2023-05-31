import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {Formik, Form, Field, FieldArray} from 'formik';
import {fetchPreferences, savePreferences} from '../slices/preferences';
import {Navigate} from 'react-router-dom';

const Profile = ({categories, authors, sources, loading, error, fetchPreferences, savePreferences}) => {
    useEffect(() => {
        fetchPreferences();
    }, [fetchPreferences]);

    const {user: currentUser} = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login"/>;
    }

    const handleSubmit = (values) => {
        savePreferences(values);
    };

    const handleButtonClick = (form, fieldName, itemId) => {
        const values = form.values[fieldName];
        const index = values.indexOf(itemId);
        console.log(index);
        if (index === -1) {
            form.setFieldValue(fieldName, [...values, itemId]);
        } else {
            form.setFieldValue(fieldName, values.filter((id) => id !== itemId));
        }
    };

    const transformInitialValues = (values) => {
        return {
            categories: values.categories.reduce((acc, category) => {
                if (category.checked) {
                    acc.push(category.id);
                }
                return acc;
            }, []),
            authors: values.authors.reduce((acc, author) => {
                if (author.checked) {
                    acc.push(author.id);
                }
                return acc;
            }, []),
            sources: values.sources.reduce((acc, source) => {
                if (source.checked) {
                    acc.push(source.id);
                }
                return acc;
            }, []),
        };
    };

    return (
        <div className="container">
            <h1 className="text-white text-capitalize font-weight-bold">Profile</h1>
            <div className="jumbotron bg-white p-3 rounded">
                <Formik initialValues={transformInitialValues({categories, authors, sources})} onSubmit={handleSubmit}>
                    <Form>
                        <h3>Select your preferences:</h3>
                        <div className="form-group">
                            <label>Categories:</label>
                            <FieldArray name="categories">
                                {({form}) => (
                                    <div className="row mx-1 gap-1">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                className={`btn text-capitalize col-auto btn-sm rounded ${
                                                    form.values.categories.includes(category.id)
                                                        ? 'btn-success'
                                                        : 'btn-outline-secondary'
                                                }`}
                                                onClick={() => handleButtonClick(form, 'categories', category.id)}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </FieldArray>
                        </div>
                        <div className="form-group mt-1">
                            <label>Sources:</label>
                            <FieldArray name="sources">
                                {({form}) => (
                                    <div className="row mx-1 gap-1">
                                        {sources.map((source) => (
                                            <button
                                                key={source.id}
                                                type="button"
                                                className={`col-auto btn btn-sm rounded ${
                                                    form.values.sources.includes(source.id)
                                                        ? 'btn-success'
                                                        : 'btn-outline-secondary'
                                                }`}
                                                onClick={() => handleButtonClick(form, 'sources', source.id)}
                                            >
                                                {source.name}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </FieldArray>
                        </div>

                        <button type="submit" className="btn btn-primary my-4">
                            Save
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    categories: state.preferences.categories,
    authors: state.preferences.authors,
    sources: state.preferences.sources,
    loading: state.preferences.loading,
    error: state.preferences.error,
});

const mapDispatchToProps = {
    fetchPreferences,
    savePreferences,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
