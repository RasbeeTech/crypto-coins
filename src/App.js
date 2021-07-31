import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Table from 'react-bootstrap/Table';

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
      <Container>
        <Navigation />
        <QuickView cryptos = { this.state.cryptos } />
        <Form className="d-flex mt-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-light bg-secondary">Search</Button>
        </Form>
        <ViewAll />
      </Container>
    );
  }
}

let Navigation = (props) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mt-2 border border-secondary">
      <Container>
        <Navbar.Brand>
          <img src="https://img.icons8.com/wired/64/000000/currency.png" style={{ width:"35px" }}/>
          Crypto-Coins
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="#viewAll">View All</Nav.Link>
            <Nav.Link href="#info">Info</Nav.Link>
            <Nav.Link href="#currency">Currency</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

let QuickView = (props) => {
  const quickViewItems = props.cryptos.map( (crypto, index) => {
    return (
      <Carousel.Item key = { index }>
        <Card bg="dark" className="text-center text-light border border-secondary py-5">
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

let ViewAll = (props) => {
  return (
    <Table striped bordered hover variant="dark" className="mt-2" id="viewAll">
          <thead>
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>24h</th>
            <th>7d</th>
            <th>YTD</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Bitcoin</td>
              <td>BTC</td>
              <td>+5%</td>
              <td>+20%</td>
              <td>+25%</td>
            </tr>
          </tbody>
        </Table>
  )
}

export default App;
