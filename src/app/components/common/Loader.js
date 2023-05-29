import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex w-full min-vh-100 justify-content-center align-items-center">
            <div className={"row justify-content-center align-items-center"}>
                <div className="col-12">
                    <div className="spinner-grow p-3 text-primary" role="status">
                        {/*<span className="visually-hidden">Loading...</span>*/}
                    </div>
                </div>
                <div className="col-12">
                    <h5 className={"text-center"}>Loading...</h5>
                </div>
            </div>
        </div>
    );
};

export default Loader;