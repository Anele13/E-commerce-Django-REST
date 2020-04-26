import React from 'react';
import { Link } from 'react-router-dom';

class PageNotFound extends React.Component{
    render(){
        return <div>
            <p style={{textAlign:"center"}}>
              <h1>404 Page Not Found</h1>
              <br/>
              <h4>Sorry Kid, do you want to <Link to="/">go home </Link>?</h4>
            </p>
          </div>;
    }
}export default PageNotFound;