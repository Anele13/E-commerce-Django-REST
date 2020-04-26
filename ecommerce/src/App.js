import React, { Component } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import DetalleProducto from './components/DetalleProducto'
import PageNotFound from './components/PageNotFound'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Barra from './components/Barra';
import Carro from './components/Carro';
import { Alert } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: '',
      token: ''
    };
  }

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.user.username,
          token: localStorage.getItem('token')
        });
      })
      .catch(error => {
        console.log("fallo de credenciales")
    })
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };


  render() {
    
    let login_required = (
      <div>
        <Alert variant="danger" dismissible>
          Necesita estar loggeado para ver su carro!
        </Alert>
        <Home logged_in={this.state.logged_in}/>
      </div>
    )

    return (
      <div>
        <BrowserRouter>
          <Barra logged_in={this.state.logged_in} handle_logout={this.handle_logout}/>
          <br/>
            <Switch>
                <Route 
                exact path="/" 
                render={props => <Home logged_in={this.state.logged_in}/>}
                />

                <Route 
                  exact path="/login">
                  {this.state.logged_in ? <Redirect to="/" /> : <LoginForm handle_login={this.handle_login}/> }
                </Route>
                
                <Route
                  exact path="/signin"
                   component={() => <SignupForm handle_signup={this.handle_signup} />} 
                />
                
                <Route exact path="/producto/:id/" 
                  component={DetalleProducto} 
                />

                <Route 
                  exact path="/carro">
                  {this.state.logged_in ? <Carro/>: login_required}
                </Route>

                <Route path="/404" component={PageNotFound} />
                <Redirect to="/404" />
              </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
