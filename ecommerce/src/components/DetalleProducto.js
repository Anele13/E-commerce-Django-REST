import './image-gallery.css'; //TODO: arreglar este import
import React from 'react';
import Footer from './Footer';
import { FaCreditCard, FaTruck, FaCartPlus } from 'react-icons/fa';
import ImageGallery from 'react-image-gallery';
import {Container, Row, Col, Card, Button, Accordion} from 'react-bootstrap'

class DetalleProducto extends React.Component{

    constructor(){
        super();
        this.state = {nombre:'pepe2'}
    }

    async componentDidMount(){
        await this.fetchProducto()
    }
    
    fetchProducto = async() => {
        console.log("buscando")
        fetch("http://localhost:8000/producto/"+this.props.match.params.id)
        .then(response => response.json())
        .then(data => {
            this.setState({nombre:data.nombre,
                          descripcion: data.descripcion,
                          ranking : data.ranking,
                          thumbnail: data.thumbnail,
                          precio: data.precio,
                          fabricante:data.fabricante,
                          categoria: data.categoria                            
                        })
        })
        .catch(error => {
            console.log("no se encontro el producto")
        })
    }

    render(){
        //"https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/vans.png",
        const images = [
            {
              original: this.state.thumbnail,
              thumbnail: this.state.thumbnail
            },
          ];

        return(
            <div>
                <Container fluid>
                    <Row>
                        <Col md={{ span: 6, offset: 1 }}>
                            <Container>
                                <ImageGallery items={images} thumbnailPosition="left"/>
                            </Container>
                        </Col>
                        <Col xs={12} lg={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        <h4>{this.state.nombre}</h4>
                                    </Card.Title>
                                    <br/>
                                    <Card.Title>
                                        <h2>$ {this.state.precio}</h2>
                                    </Card.Title>
                                    <br/>
                                    <Card.Title>
                                        <h6><FaCreditCard/> Paga en 12 Cuotas</h6>  
                                    </Card.Title>
                                    <span className="dc_payment_icons_bevel_48 dc_visa_bevel" title="Visa"></span>
                                    <span className="dc_payment_icons_bevel_48 dc_visa02_bevel" title="Visa"></span>
                                    <span className="dc_payment_icons_bevel_48 dc_mastercard_bevel" title="Mastercard"></span>
                                    <span className="dc_payment_icons_bevel_48 dc_americanexpress_bevel" title="American Express"></span>
                                    <span className="dc_payment_icons_bevel_48 dc_americanexpress02_bevel" title="American Express"></span>
                                    <br/>
                                    <Card.Title>
                                        <h6 style={{color: "green"}}><FaTruck/> Envios a todo el pais</h6>  
                                    </Card.Title>
                                    <hr/>
                                    <Button block size="lg"><FaCartPlus/> Agregar al carro</Button>
                                    <hr/>
                                    <Accordion defaultActiveKey="0">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                            Descripcion
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                            <Card.Body>{this.state.descripcion}</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                            Opiniones
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                            <Card.Body>Hello! I'm another body</Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <Footer/>
            </div>
            
        )
    }
}

export default DetalleProducto