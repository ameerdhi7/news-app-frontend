import React from 'react';

const Error = ({errorMessage}) => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card text-center mt-5">
                        <div className="card-body">
                            <h2 className="card-title">Error</h2>
                            <p className="card-text">{errorMessage}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;
