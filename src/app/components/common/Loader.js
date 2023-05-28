import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex w-full h-100 justify-content-center align-items-center">
            <div className={"row"}>
                <div className="col">
                    <div className="spinner-border text-primary" role="status">
                        {/*<span className="visually-hidden">Loading...</span>*/}
                    </div>
                </div>
                <div className="col-12">
                    <span>Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Loader;