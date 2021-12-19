import React,{ useState, useEffect} from 'react';
import SearchTagForm from './SearchTagForm';
var tags = ['artificial-intelligence','data-science','javascript','biotechnology','math','space','travel','outdoors',
              'world','photography','fitness','creativity','fiction','books','poetry','writing','true-crime','comics','tv','film',
              'music','style','lifestyle','beauty','environment','social-media','science','technology','deep-learning','blockchain','health','future','business',
              'work','culture','programming','design','LGBTQIA','politics','relationships','self','startups','food','neuroscience','python',
               'mental-health','mindfulness','spirituality','productivity','machine-learning','freelancing','leadership','economy','money','basic-income',
               'cryptocurrency','cybersecurity','privacy','blockchain','society','cities','self-driving-cars','transportation',
              'san-francisco','humor','language','digital-life','gadgets','gaming',,'love'
            ]
var moreTags = ['feminism','women','women-in-tech','gender','equality','politics','diversity','women-rights','gender-equality','fashion',
                'life-lessions','life','love','life','dating','self-improvement','marriage','short-story',
                'event-us','leather','news','events','clubs','contests','latex','market-research-reports','growth','analysis',
                'marketing-strategies','market-trends','healthcare','market-size','market-growth',]
function LandingPage(){
    // const [responce,setResponce] = useState("");
    // useEffect(()=>{
    //   const socket = socketIOClient('http://localhost:4000');
    //   socket.on('FromAPI',data=>{
    //     setResponce(data);
    //   });
    //   return () => socket.disconnect();
    // },[]);
    return (
      <div className="landing-page-container">
          <div className="content-container">
            <h1>Select What you are into!!!</h1>
            <p>And it will help you find great things that really matter to you.</p>
            <SearchTagForm />
            <div className="tags-container">
              {
                tags.map((tag,index) => <a className={" tag"} key={index} id={tag} href={`/blogs/${tag}`}><div className="pound" id={tag}>#</div>{tag}</a>)
              } 
            </div>
          </div>
          
      </div>
    )
  }

export default LandingPage;