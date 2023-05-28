import React from 'react';

const EmptyState = ({message = "Could find results"}) => {
    return (
        <div className="empty-state">
            <p className="empty-state__message">{message}</p>
        </div>
    );
};

export default EmptyState;
