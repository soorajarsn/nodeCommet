import React,{useState,useEffect} from 'react';
import qs from 'qs';
import Nav from './Nav';
import Loader from './Loader';
import {useParams} from 'react-router';
import socketIOClient from 'socket.io-client';
import {Redirect} from "react-router-dom";
  // function handleForTagClick(event){
  //   console.log(event.target.getAttribute('id'));
  //   var tagName = event.target.getAttribute('id');
  //   setTag(tagName);
  //   getResponse(tagName);
  // }
function Blogs(props){

  const [items,setItems] = useState([]);
  const [startWith,setStartWith] = useState(0);
  const [tag,setTag] = useState(useParams().tg);
  const [loading,setLoading] = useState(true);
  const [hasMore,setHasMore] = useState(false);
  const [streaming,setStreaming] = useState(false);
  const [redirect,setRedirect] = useState(false);
  
  var socket;
  function getResponse(){
    setLoading(true);
    setStreaming(true);
    socket = socketIOClient('/');
    socket.emit('getBlogs',tag,startWith);
    socket.on("FromAPI",responce => {
      if(!responce.streaming)
        socket.disconnect();
      processResponce(responce);
    })
  }

  useEffect(()=>{
    getResponse();
  },[]);
  
  function processResponce(responce){
    setItems(prev=>[...prev,responce.blog]);
    setLoading(false);
    setStreaming(responce.streaming);
    setRedirect(responce.notFound);
    if(!responce.streaming){//so that these start variable change for only one time in a single request;
      setStartWith(prev => prev+10);
      setHasMore(responce.hasMore);
    }
  }
  function handleGetButton(){
      getResponse();
  }
  
  
  if(items.length === 0 && loading){
    return (
      <Loader />
    )
  }
  else if(redirect){
    const redirectTo = `/not-found/${tag}`;
    return <Redirect to={redirectTo} />;
  }
  else{
    return (
      <div>
        {loading && <div className="top-loader"></div>}
        <Nav />
        <div className="main-container">
          <h1 className='tag-name'>#{tag}</h1>
          <div>
              <div>
                  {
                    items.map((item,index) => <a href={`/detailed-article?q=${item.linkToBlogPage}`} key={index} target="_blank">
                                                <div className="card" key={index}>
                                                  <div className="content-container">
                                                    <h2>{item.title}</h2>
                                                    <p>{item.description}...</p>
                                                    <ul><li>written By - <strong>{item.writer}</strong></li><li><i className="far fa-star"></i>{item.details}</li></ul>
                                                  </div>
                                                  { item.img && <div className="img-container">
                                                                  <img src={item.img} alt=''/>
                                                                </div>
                                                  }
                                                </div>
                                              </a>
                              )
                    }
              </div>
              { 
                streaming &&    <div className="card">
                                    <div className="content-container streaming">
                                      <h1>Crawling...</h1>
                                    </div>
                                    <div className="img-container">
                                    </div>
                                </div>
              }
              <div className="button-container">{!loading && !streaming && hasMore && <button className="get-more-button" onClick={handleGetButton}>Get More</button>}</div>
          </div>
        </div>
      </div>
    )
  }

}

export default Blogs;
