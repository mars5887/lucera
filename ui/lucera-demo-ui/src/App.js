import React, { Component } from 'react';
import './App.css';
import Clock from './local/comp/util/Clock/Clock'
import Dashboard from './local/comp/DB/DB'
import ErrorBoundary from './local/comp/util/Error/ErrorBoundary'

class App extends Component {

  constructor() {
    super();
    this.state = {
        data:[]
      };
  }

  componentDidMount() {
    /*
    Normally would put this in the components CDM method, but since this
    was a code expose I decided to use Promise all example here to load the
    data for both bar charts and pass as props
    */
    Promise.all([
      fetch('http://localhost:3030/lpbidqtotals'),
      fetch('http://localhost:3030/lpbidptotals')
      //fetch("url3"),
    ])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([res1, res2]) => {
      this.setState(
        { lpTotBidQuantity: res1.map( (item) => {
            if ( item._id ) {
              return {name:item._id, value: (+item['Total Bids']/1000000000000).toFixed(3)}
            }
            return {};
          }),
          lpTotBidPrices: res2.map( (item) => {
              if ( item._id ) {
                return {name:item._id, value: (+item['Total Bids']/1000000000000).toFixed(3)}
              }
              return{};
          }),
        });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Clock />
          <p>
          Welcome to MarsAware Desk
          </p>
          <a
            className="App-link"
            href="//localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn MarsAware Desk
          </a>
        </header>
        <ErrorBoundary>
          <Dashboard data={this.state}/>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
