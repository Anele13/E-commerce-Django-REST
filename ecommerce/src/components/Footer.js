import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

class Footer extends React.Component{

    render(){
        return(
            <div>
                <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom">
                    <Container>
                        <div>Sitio de Compras</div>
                    </Container>
                </Navbar>
            </div>
            
        )
    }
}

export default Footer