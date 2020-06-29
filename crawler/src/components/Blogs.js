import React,{useState,useEffect} from 'react';
import qs from 'qs';
import Nav from './Nav';
import Loader from './Loader';
import {useParams} from 'react-router';


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
  const [loading,setLoading] = useState(false);
  const [hasMore,setHasMore] = useState(false);
  // console.log(props.match.params);
  
  async function getResponse(tagName){
      setLoading(true);
      let responce = await fetch(`/blogs/?tag=${tagName}&&start=${startWith}`);
      responce = await responce.json();
      setItems(prev => [...prev,...responce.blogs]);
      setLoading(false);
      setStartWith(prev => prev+10);
      setHasMore(responce.hasMore);
      // console.log(responce);
  }
  
  
  useEffect(()=>{
    getResponse(tag);
  },[]);
  
  
  function handleGetButton(){
      getResponse(tag);
  }
  
  
  if(items.length === 0 && loading){
    return (
      <Loader />
    )
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
                                                    <ul><li>written By - <strong>{item.writer}</strong></li><li><i class="far fa-star"></i>{item.details}</li></ul>
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
              <div className="button-container">{!loading && hasMore && <button className="get-more-button" onClick={handleGetButton}>Get More</button>}</div>
          </div>
        </div>
      </div>
    )
  }

}

export default Blogs;
