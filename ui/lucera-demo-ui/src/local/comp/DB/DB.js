/*
Dashboad Component Manages Tiles. Did not get enough time to finish the
add/remove and drag n drop fucntionality.
*/
import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './DB.css';
import DBTileContainer from './DBContainer';
import Tile from '../../uicomp/Tile/Tile';
import BarGraph from '../../uicomp/BarGraph/BarGraph';
import Table from '../../uicomp/Table/Table';
import {
  message,
} from 'antd';

import Dropdown from '../../uicomp/Dropdown/Dropdown';


export default class Dashboard extends Component {

  constructor() {
    super();

    const tileOptions = [
      { dataHook:0, name: 'Time', tile: Table },
      { dataHook:1, name: 'Total Bids', tile: BarGraph },
      { dataHook:2, name: 'Total Bid Quantities', tile: BarGraph },
    ];

    // tiles currently in use
    let tiles = [],
         key = 20;

    for (let i = 0; i < tileOptions.length; i++) {
      tiles.push({ name: tileOptions[i].name, key: key++ });
    }

    // generate some data to show in the tiles
    var data = {}//this.props && this.props.data || {}

    this.state = {
      tileOptions: tileOptions,
      tiles: tiles,
      key: key,
      data: data,
    }
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    // if( prevProps.totalBids !== this.props.totalBids ) {
    //   this.setState( {totalBids: this.props.totalBids});
    // }
  }

  addTile = (key) => {
    let tiles = this.state.tiles.slice()
    let newKey = this.state.key + 1;

    tiles.push({ name: this.state.tileOptions[key].name, key: newKey });
    this.setState({ tiles: tiles, key: newKey });
  }

  removeTile = (tileIndex) => {
    let tiles = this.state.tiles.filter((item, index) => {
      return index !== tileIndex;
    });
    this.setState({ tiles: tiles });
  }

  getTileContent = (name: string) => {
    const { lpTotBidPrices, lpTotBidQuantity } = this.props.data;
    const arr = this.state.tileOptions;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === name) {
        if ( arr[i].dataHook === 1 && lpTotBidPrices) {
          return React.createElement(arr[i].tile, { data: lpTotBidPrices, title: 'Total Bid Amounts in Trillions' });        }
        else if ( arr[i].dataHook === 2 && lpTotBidQuantity ) {
          return React.createElement(arr[i].tile, { data: lpTotBidQuantity, title: 'Total Bid Quantities in Trillions' });
        }
        return React.createElement(arr[i].tile, { data: this.props.data });
      }
    }
    throw new Error(`Sorry tile: ${name} not found `);
  }

  handleMenuClick =(e) => {
    this.addTile(e.key);
  }

  render() {
    return(
      <div className="container">

        <AddTileRow show = {true}
                    tileOptions={this.state.tileOptions}
                    addTile= {this.addTile}
                    handleMenuClick={this.handleMenuClick}

        />

        <div className="dashboard">
          {
            this.state.tiles.map((item, index) => {
              return <DBTileContainer
              widest={1}
              ratio={2}
              key={index}
              src={
                <Tile
                  header={item.name}
                  content={this.getTileContent(item.name)}
                  remove={this.removeTile}
                  add={this.addTile}
                  index={index}
                  key={index}
                />
                }
              />
            })
          }
        </div>
      </div>
    )
  };

};

function AddTileRow(props) {
  if (props.show) {
    return (
      <div className="container row">
        <label>
          Select a tile type: {' '}
          <Dropdown
            menuClick= {props.handleMenuClick}
            itemsSource={ props.tileOptions }
            displayMemberPath="name" />
          {' '}

        </label>
      </div>
    )
  }
  else {
    return(<div />)
  }
}
