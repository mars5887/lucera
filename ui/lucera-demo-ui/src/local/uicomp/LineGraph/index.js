import React, { Component } from 'react'
import LineChart from './LineChart'
import { Spin, message } from 'antd';

export default class LineGraph extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    // fetch('http://localhost:3030/prices/USD/MXN')
    // .then( response => {
    //     return response.json();
    // })
    // .then( jsonData => {
    //     this.setState( {data: jsonData.map( (value) => {
    //       let y = new Date(value.bid.ts).getTime();
    //       let x = +value.bid.bid_price;
    //       return {x,y};
    //     })
    //   });
    // });
  }

  createFakeData(){
    // This function creates data that doesn't look entirely random
    const data = []
    for (let x = 0; x <= 30; x++) {
      const random = Math.random();
      const temp = data.length > 0 ? data[data.length-1].y : 50;
      const y = random >= .45 ? temp + Math.floor(random * 20) : temp - Math.floor(random * 20);
      data.push({x,y})
    }
    return data;
  }


  render() {
    //if ( this.state.data.length > 0 ) {
      return (
          <div className="LineGraphCont">
            <div className="header">react svg line chart [part 1]</div>
            <LineChart data={this.createFakeData()} />
            <br/>
            <LineChart data={this.createFakeData()} color={'#F44336'}  />
          </div>
        );
    // }
    // else {
    //   return (<Spin size="large" />);
    // }
  };
};
