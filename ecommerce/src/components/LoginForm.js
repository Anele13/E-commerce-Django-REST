import React from 'react';
import PropTypes from 'prop-types';
import {Form, Button, Container, Row, Col} from 'react-bootstrap'

class LoginForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <Container fluid>
        
        <Row>
          <Col md={{ span: 3, offset: 4 }}>

          <form onSubmit={e => this.props.handle_login(e, this.state)}>
            <h4>Log In</h4>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control placeholder="Ingrese usuario" 
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handle_change} />
            </Form.Group>
            
            <Form.Group controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="Ingrese password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handle_change} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </form>
        </Col>
        </Row>        
      </Container>
      
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired,
};