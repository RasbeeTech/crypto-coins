import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      currency: "cad",
      dataLoaded: false,
      cryptos: [
        {
          name: "Bitcoin",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/480px-Bitcoin.svg.png",
          infoUrl: "https://bitcoin.org" 
        },
      ]
    };
  }
  handleCurrencyChange(newCurrency) {
    this.setState({
      currency: newCurrency
    }, () => {
      this.fetchData();
    });
  }
  componentWillMount() {
    this.fetchData();
  }
  fetchData() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=" + this.state.currency + "&order=market_cap_desc&per_page=20&page=1&sparkline=false")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const cleanData = data.map((obj) => {
        return {
          name: obj.name,
          symbol: obj.symbol.toUpperCase(),
          imageUrl: obj.image,
          value: obj.current_price,
          update: new Date(obj.last_updated).toUTCString(),
          dayChange: obj.price_change_24h.toFixed(2),
          dayChangePercent: obj.price_change_percentage_24h.toFixed(2),
          dayHigh: obj.high_24h,
          dayLow: obj.low_24h
        }
      });
      this.setState({
        dataLoaded: true,
        cryptos: cleanData,
      });
    })
  }
  render() {
    return (
      <Container>
        <Navigation
          currency={ this.state.currency } 
          currencyChange={ this.handleCurrencyChange }
        />
        <QuickView 
          currency={ this.state.currency }
          cryptos={ this.state.cryptos.slice(0, 7) } 
        />
        <Form className="d-flex mt-3">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-light bg-secondary">Search</Button>
        </Form>
        {
        this.state.dataLoaded && 
          <ViewAll 
          currency={ this.state.currency }
          cryptos={ this.state.cryptos }
          />
        }
      </Container>
    );
  }
}

const Navigation = (props) => {
  const currencyFlags = [
    "https://img.icons8.com/color/48/000000/usa-circular.png", "https://img.icons8.com/color/48/000000/canada-circular.png",
    "https://img.icons8.com/color/48/000000/japan-circular.png", "https://img.icons8.com/color/48/000000/euro-pound-exchange--v1.png",
    "https://img.icons8.com/color/48/000000/great-britain-circular.png"
  ]
  const currencies = ["usd", "cad", "jpy", "eur", "gbp"].map((currency, index) => {
    return (
      <NavDropdown.Item key={ index } className="fw-bolder" onClick={ () => props.currencyChange(currency) }>
        <img src={ currencyFlags[index] } className="me-4" />
        { currency.toUpperCase() }
      </NavDropdown.Item>
    );
  }); 
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mt-2 border border-secondary">
      <Container>
        <Navbar.Brand className="fw-bold">
          <img src="https://img.icons8.com/wired/64/000000/currency.png" className="me-2 w-25" />
          Crypto-Coins
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="me-auto">
          <Nav>
            <Nav.Link href="#viewAll">View All</Nav.Link>
            <Nav.Link href="#info">Info</Nav.Link>
            <NavDropdown title={"Currency (" + props.currency.toUpperCase() + ")"}>
              { currencies }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const QuickView = (props) => {
  const quickViewItems = props.cryptos.map( (crypto, index) => {
    return (
      <Carousel.Item key = { index }>
        <Card bg="dark" className="text-center text-light border border-secondary py-5">
          <Card.Img variant="top" src={ crypto.imageUrl } style={{ width: '100px', display: 'block', margin: 'auto' }}/>
          <Card.Body>
            <Card.Title as="h1">{ crypto.name }</Card.Title>
            <Card.Text>Price value in { props.currency.toUpperCase() }</Card.Text>
            <small>Last updated:< br/>{ crypto.update }</small>
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

const ViewAll = (props) => {
  const colorIndicators = (value) => {
    return value > 0 ? "text-success" : "text-danger";
  }
  const formatCurrency = (num) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const data = props.cryptos.map( (obj, index) => {
    return (
      <tr key={ index }>
        <td>{ index + 1 }</td>
        <td>{ obj.name }</td>
        <td>{ obj.symbol}</td>
        <td>{ formatCurrency(obj.value) }</td>
        <td className={ colorIndicators(obj.dayChange) }>{ obj.dayChange }</td>
        <td className={ colorIndicators(obj.dayChangePercent) }>{ obj.dayChangePercent }</td>
        <td>{ obj.dayLow }</td>
        <td>{ obj.dayHigh }</td>
        <td>{ obj.update }</td>
      </tr>
    );
  });
  return (
    <Table responsive striped bordered hover variant="dark" className="mt-2" id="viewAll">
          <thead className="text-center">
            <th>#</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>{ "Value (" + props.currency.toUpperCase() + ")" }</th>
            <th>24h change ($)</th>
            <th>24h change (%)</th>
            <th>24h low</th>
            <th>24h high</th>
            <th>Last updated</th>
          </thead>
          <tbody className="text-center">
            { data }
          </tbody>
        </Table>
  )
}

export default App;
