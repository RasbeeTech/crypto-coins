import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: [
        {
          name: "Bitcoin",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/480px-Bitcoin.svg.png",
          infoUrl: "https://bitcoin.org" 
        },
        {
          name: "Ethereum",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Ethereum-icon-purple.svg",
          infoUrl: "https://ethereum.org"
        },
        {
          name: "Dogecoin",
          imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png",
          infoUrl: "https://dogecoin.com/"
        }
      ]
    };
  }
  render() {
    return (
      <Container fluid>
        <div className="h1 text-light text-center py-3">Crypto-Coins</div>
        <QuickView cryptos = { this.state.cryptos } />
        <Navigation />
        <div>
          hello
        </div>
      </Container>
    );
  }
}

let Navigation = (props) => {
  return (
    <Navbar bg="secondary" expand="lg" className="mt-2">
      <Container>
        <Navbar.Brand href="#home">Crypto-Coins</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-dark">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

let QuickView = (props) => {
  const quickViewItems = props.cryptos.map( (crypto, index) => {
    return (
      <Carousel.Item key = { index }>
        <Card bg="secondary" className="text-center py-5">
          <Card.Img variant="top" src={ crypto.imageUrl } style={{ width: '100px', display: 'block', margin: 'auto' }}/>
          <Card.Body>
            <Card.Title as="h1">{ crypto.name }</Card.Title>
            <Card.Text>Price value in USD</Card.Text>
            <small>Last updated: 5 mins ago</small>
          </Card.Body>
        </Card>
      </Carousel.Item>
    );
  });
  return (
    <Carousel className="mt-2">
      {quickViewItems}
    </Carousel>
  );
}

export default App;
