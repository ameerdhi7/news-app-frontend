import React from 'react';

const EmptyState = ({message = "No results found"}) => {
    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <p className="empty-state__message h2 text-center text-danger">{message}</p>
        </div>
    );
};

export default EmptyState;
