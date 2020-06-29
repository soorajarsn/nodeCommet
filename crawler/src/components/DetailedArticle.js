import React,{useState,useEffect} from 'react';
import qs from 'qs';
import Loader from './Loader';
import Nav from './Nav';
import Footer from './Footer';


function DetailedArticle(props){
    
    const link = qs.parse(props.location.search,{ignoreQueryPrefix:true}).q;
    const [body,setBody] = useState('');
    
    useEffect(()=>{ 
        async function getResponce(link){
            var responce = await fetch('/detailed-blog?q='+link);
            responce = await responce.json(); 
            console.log(responce);
            setBody(responce.body);
        }
        getResponce(link); 
    },[]);
    // useEffect(() => {
    //     function handleReadyEvent(){
    //         console.log('ready');
    //     }
    //     window.addEventListener('ready',handleReadyEvent);
    //     return () => {
    //         window.removeEventListener('ready',handleReadyEvent)
    //     }
    // });
    
    function createMarkup(){
        return {__html:body};
    }
    
    function handleLoad(){
        console.log('loaded');
    }
    return (
       <>
            {
             body && 
                <>   
                    <Nav />
                    <div onLoad={handleLoad} className="article-content" dangerouslySetInnerHTML={createMarkup()} />
                    <Footer />
                </>
            }
            {!body && <Loader onLoad={handleLoad}/>}
        </>
    )
}
export default DetailedArticle;