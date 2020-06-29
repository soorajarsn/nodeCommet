import React from 'react';
function Nav(){
    return (
        <nav>
            <div className="title-container"> 
                <a href="/"><div className={"img-container"}><img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSQh6jNkrPDXGYRhEW04IeKTYiaiAwSj_LoknEfupEI16pwyeko&usqp=CAU"} alt="none" /></div></a>
                <a href="/"><h1 className={"title"}>Crawler</h1></a>
            </div>
        </nav>
    )
  }
  export default Nav;