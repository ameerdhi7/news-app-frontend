import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import {fetchPreferences} from '../slices/preferences';
import {savePreferences} from '../slices/preferences';
import {Navigate} from "react-router-dom";

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

    return (
        <div>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center">Error: {error}</div>
            ) : (
                <Formik initialValues={{categories: [], authors: [], sources: []}} onSubmit={handleSubmit}>
                    <Form>
                        <div className="form-group">
                            <label>Categories:</label>
                            <div>
                                {categories.map((category) => (
                                    <div key={category.name} className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input
                                                type="checkbox"
                                                name="categories"
                                                value={category.name}
                                                className="form-check-input"
                                            />
                                            {category.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Authors:</label>
                            <div>
                                {authors.map((author) => (
                                    <div key={author.name} className="form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input type="checkbox" name="authors" value={author.name}
                                                   className="form-check-input"/>
                                            {author.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Sources:</label>
                            <Field
                                as="select"
                                id="sources"
                                name="sources"
                                className="form-control"
                                multiple
                            >
                                {sources.map((source) => (
                                    <option key={source.name} value={source.name}>
                                        {source.name}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </Form>
                </Formik>
            )}
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
