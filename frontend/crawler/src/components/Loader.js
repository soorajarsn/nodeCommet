import React from 'react';
import Nav from './Nav';

function Loader(){
    return (
        <div className="loader-page-container">
            <Nav />
            <div className="blur-background"><div className="loader"></div></div>
        </div>
    )
}

export default Loader;