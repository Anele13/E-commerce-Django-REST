import React, { Component } from 'react';
import {Card, Button, Container} from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

 class Home extends Component{

    constructor(props) {
        super(props);
        this.state = { idProducto: 1 };
    }

    handleClick = e => {
        this.props.history.push('/producto/'+this.state.idProducto+'/');
    };
    
    render(){
        return(
            <div>
                <Container fluid>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Un producto </Card.Title>
                            <Card.Text>
                            Esta es la vista de un producto
                            </Card.Text>
                            <Button color="primary" className="px-4"
                                onClick={this.handleClick}
                                >
                                buscar
                            </Button>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
    }
}
export default withRouter(Home)
