import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { FaCartPlus, FaUser } from 'react-icons/fa';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

class Barra extends React.Component{

    render(){
        return(
            <Navbar style={{position: "sticky", top: 0}} expand="lg" variant="light" bg="light" fixed="top">
                <Container>
                    <Navbar.Brand href="/">Tienda</Navbar.Brand>
                    <Nav>
                        <Nav.Link href="/carro">
                            <FaCartPlus/>
                            <Link to="/carro">Mi Carro</Link>  
                        </Nav.Link>
                        <Nav.Link eventKey={2}>
                            <FaUser/>
                            {this.props.logged_in ? <Link onClick={this.props.handle_logout}>logout</Link>  : <Link to="/login">Login </Link>   }
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}
export default Barra

Barra.propTypes = { 
    handle_logout: PropTypes.func.isRequired,
};