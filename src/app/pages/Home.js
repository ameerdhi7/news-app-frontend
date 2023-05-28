import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchNews} from "../slices/news";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/common/Loader";

const HomePage = ({articles, loading, error, fetchNews}) => {
    useEffect(() => {
        fetchNews(); // Fetch news data when the component mounts
    }, [fetchNews]);

    if (loading) {
        return <Loader/>; // Show a loading state while fetching news data
    }

    if (error) {
        return <div>Error: {error}</div>; // Show an error message if fetching news data fails
    }

    return (
        <div>
            <h1>News for you</h1>
            <div className="container">
                <div className="row">
                    {articles.map((article) => (
                        <div className="col-12 col-md-4" key={article.title}>
                            <ArticleCard article={article}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        articles: state.news.articles, // Access the news data from the Redux store
        loading: state.news.loading, // Access the loading state from the Redux store
        error: state.news.error, // Access the error state from the Redux store
    }
};

const mapDispatchToProps = {
    fetchNews, // Bind the fetchNews action creator to the component's props
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
