import React, {useState} from 'react';

const ArticleCard = ({article}) => {
    // Local state to track whether full description should be shown or not
    const [showFullDescription, setShowFullDescription] = useState(false);

    // Number of words to display initially for description
    const descriptionLimit = 5;

    // Number of characters to display initially for title
    const titleLimit = 40;

    // Toggle the description display state
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    // Truncate the description to the specified limit and add "Read More" button
    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > descriptionLimit) {
            const truncatedWords = words.slice(0, descriptionLimit).join(' ');
            return (
                <>
                    {truncatedWords}...{' '}
                    <button className="btn btn-link" onClick={toggleDescription}>
                        Read More
                    </button>
                </>
            );
        }
        return description;
    };

    // Truncate the title to the specified limit and add ellipsis
    const truncateTitle = (title) => {
        if (title.length > titleLimit) {
            return `${title.substring(0, titleLimit)}...`;
        }
        return title;
    };

    return (
        <div className="card mb-3">
            <img src={article.image_url}
                 style={{height: '200px', objectFit: 'cover'}} // Limit the height and adjust the object-fit
                 className="card-img-top" alt={article.title}/>
            <div className="card-body">
                <h5 className="card-title">
                    {truncateTitle(article.title)}
                </h5>
                <p className="card-text">
                    {/* Render truncated or full description based on showFullDescription state */}
                    {showFullDescription
                        ? article.description
                        : truncateDescription(article.description)}
                </p>
                <p className="card-text">
                    <small className="text-muted">
                        Source: {article.source}
                    </small>
                </p>
                <p className="card-text">
                    {article.author && <small className="text-muted">Author: {article.author}</small>
                    }
                </p>
            </div>
        </div>
    );
};

export default ArticleCard;
