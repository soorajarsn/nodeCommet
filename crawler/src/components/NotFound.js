import React from 'react';
import SearchTagFom from "./SearchTagForm";
function NotFound(props){
    return (
        <div className="not-found">
            <div className="content-container">
                <h1>404</h1>
                <h2>Oops! Page not found</h2>
                <p>Sorry, but we don't find anything related
                 to this tag. Please search for anything else.</p>
                <SearchTagFom />
            </div>
        </div>
    )
}
export default NotFound;