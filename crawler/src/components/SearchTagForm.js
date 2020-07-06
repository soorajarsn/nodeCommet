import React from "react";

function SearchTagForm(){
    function litContainer(){
        document.querySelector('.input-container').style.boxShadow =  "0 0 .5rem 0 white";
    }
    function litOffContainer(){
        document.querySelector('.input-container').style.boxShadow = 'none';
    }
    return (
        <form action="/" method="post">
              <div className="input-container">
                <input onFocus={litContainer} onBlur={litOffContainer} name="tag" placeholder="Search for the topics..." autoComplete="off" />
              </div>
              <div className='button-container'>
                <button>Search</button>
              </div>
        </form>
    )
}

export default SearchTagForm;