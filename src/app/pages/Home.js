import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchNews} from "../slices/news";
import ArticleCard from "../components/ArticleCard";
import Loader from "../components/common/Loader";
import Error from "../components/common/Error";
import EmptyState from "../components/common/EmptyState";
import SearchBar from "../components/SearchBar";

const HomePage = ({articles, loading, error, fetchNews}) => {
    useEffect(() => {
        fetchNews(); // Fetch news data when the component mounts
    }, [fetchNews]);

    if (loading) {
        return <Loader/>; // Show a loading state while fetching news data
    }

    if (error) {
        return <Error errorMessage={error}/>; // Show an error message if fetching news data fails
    }
    const isEmpty = articles.length === 0;
    if (isEmpty) {
        return <EmptyState/>
    }

    return (
        <div className={"container"}>
            <div className="row justify-content-center">
                <div className="col-sm-8 col-12">
                    <h6 className={"mb-1 mt-3 text-secondary"}>Search, filter, explore, and uncover the Latest
                        News!</h6>
                    <SearchBar/>
                </div>
            </div>
            <h1 className={"h4 mt-3 text-white"}>Hot Off the Press - Get Your Daily Dose of Breaking News!</h1>
            <div className="row">
                {articles.map((article, index) => (
                    <div className={`col-12 ${index === 0 ? 'col-md-12 text-center' : 'col-md-4'}`}
                         key={article.title}>
                        <ArticleCard article={article}/>
                    </div>
                ))}
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
