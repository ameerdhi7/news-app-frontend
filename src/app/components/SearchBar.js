import React from 'react';
import {Formik, Form, Field} from 'formik';
import {connect, useDispatch} from 'react-redux';
import {searchNews} from '../slices/news'; // Import the action creator for searching news

const SearchBar = ({searchQuery, source, date, category,searchNews}) => {
    const dispatch = useDispatch();
    const handleSearch = (values) => {
        // Perform search logic here
        dispatch(searchNews(values));
    };

    const handleFormSubmit = (values) => {
        handleSearch(values);
    };
    const formValues = {searchQuery, source, date, category};

    return (
        <Formik initialValues={formValues} onSubmit={handleFormSubmit}>
            <Form className="form-inline">
                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-append">
                        <Field type={"date"} name="date" className="form-select  form-select-sm"/>
                    </div>
                    <div className="input-group-append">
                        <Field as="select" name="source" className="form-select px-3 form-select-sm">
                            <option value="">Source</option>
                            <option value="source1">Source 1</option>
                            <option value="source2">Source 2</option>
                            <option value="source3">Source 3</option>
                        </Field>
                    </div>
                    <div className="input-group-append">
                        <Field as="select" name="category" className="form-select px-3 form-select-sm">
                            <option value="">Category</option>
                            <option value="category1">Category 1</option>
                            <option value="category2">Category 2</option>
                            <option value="category3">Category 3</option>
                        </Field>
                    </div>
                    <Field type="text" name="searchQuery" className="form-control bg-secondary form-control-sm" placeholder={"Type your query and press the search button..."}/>
                    <button type="submit" className="btn btn-outline-light">Search</button>
                </div>
            </Form>
        </Formik>
    );
};

const mapStateToProps = (state) => {
    return {
        searchQuery: state.news.searchCriteria.searchQuery,
        source: state.news.searchCriteria.source,
        category: state.news.searchCriteria.category,
        date: state.news.searchCriteria.date,
    }
};
const mapDispatchToProps = {
    searchNews,
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
