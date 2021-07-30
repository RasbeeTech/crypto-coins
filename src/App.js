import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <Container fluid>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Crypto-Coins</Navbar.Brand>
            <Nav>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Carousel className="mt-2">
        <Carousel.Item>
          <Card bg="dark" text="light" className="text-center py-5">
            <Card.Img variant="top" src="https://img.icons8.com/ios/100/000000/bitcoin.png" style={{ width: '100px', display: 'block', margin: 'auto' }}/>
            <Card.Body>
              <Card.Title>Bitcoin</Card.Title>
              <Card.Text>Price value in USD</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer>
              <small>Last updated: 5 mins ago</small>
            </Card.Footer>
          </Card>
          </Carousel.Item>
          <Carousel.Item>
          <Card bg="dark" text="light" className="text-center py-5">
            <Card.Img variant="top" src="https://img.icons8.com/ios/100/000000/ethereum.png" style={{ width: '100px', display: 'block', margin: 'auto' }}/>
            <Card.Body>
              <Card.Title>Ethereum</Card.Title>
              <Card.Text>Price value in USD</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer>
              <small>Last updated: 5 mins ago</small>
            </Card.Footer>
          </Card>
          </Carousel.Item>
          <Carousel.Item>
          <Card bg="dark" text="light" className="text-center py-5">
            <Card.Img variant="top" src="https://img.icons8.com/ios/100/000000/dogecoin.png" style={{ width: '100px', display: 'block', margin: 'auto' }}/>
            <Card.Body>
              <Card.Title>Dogecoin</Card.Title>
              <Card.Text>Price value in USD</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer>
              <small>Last updated: 5 mins ago</small>
            </Card.Footer>
          </Card>
          </Carousel.Item>
        </Carousel>

      </Container>
    );
  }
}

export default App;
