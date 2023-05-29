import React from 'react';
import {Formik, Form, Field} from 'formik';
import {useDispatch} from 'react-redux';
import {searchNews} from '../slices/news'; // Import the action creator for searching news

const SearchBar = () => {
    const dispatch = useDispatch();
    const handleSearch = (values) => {
        // Perform search logic here
        dispatch(searchNews(values));
    };

    const handleFormSubmit = (values) => {
        handleSearch(values);
    };

    return (
        <Formik initialValues={{searchQuery: '', source: '', date: '', category: ''}} onSubmit={handleFormSubmit}>
            <Form className="form-inline">
                <div className="input-group input-group-sm mb-3">
                    <Field type="text" name="searchQuery" className="form-control form-control-sm"
                           placeholder="Search"/>
                    <div className="input-group-append input-group-sm">
                        <Field as="select" name="source" className="form-select form-select-sm">
                            <option value="">Select Source</option>
                            <option value="source1">Source 1</option>
                            <option value="source2">Source 2</option>
                            <option value="source3">Source 3</option>
                        </Field>
                    </div>
                    <div className="input-group-append input-group-sm">
                        <Field as="select" name="date" className="form-select form-select-sm form-control-sm">
                            <option value="">Select Date</option>
                            <option value="date1">Date 1</option>
                            <option value="date2">Date 2</option>
                            <option value="date3">Date 3</option>
                        </Field>
                    </div>
                    <div className="input-group-append input-group-sm">
                        <Field as="select" name="category" className="form-select form-select-sm">
                            <option value="">Select Category</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                            <option value="category3">Category 3</option>
                        </Field>
                    </div>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </Form>
        </Formik>
    );
};

export default SearchBar;
