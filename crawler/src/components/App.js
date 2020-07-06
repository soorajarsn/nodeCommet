import React from 'react';
import {BrowserRouter as Router,
        Switch,
        Route} from 'react-router-dom';
import Blogs from './Blogs';
import DetailedArticle from './DetailedArticle';
import LandingPage from './LandingPage';
import NotFound from "./NotFound";
function App(){
    return (
        <Router>
            <div>
                <Switch>  
                    <Route exact path="/" render = {props=> <LandingPage {...props} />} />
                    <Route exact path= '/detailed-article' render = {props => <DetailedArticle {...props} /> } />
                    <Route exact path="/blogs/:tg" render = {props => <Blogs {...props} />} />
                    <Route path="/not-found/:tag" render={props => <NotFound {...props} />} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;