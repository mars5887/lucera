import React, { Component } from 'react';

const SMALLEST_WIDTH = 300; /*px*/

export default class DBTileContainer extends Component {

  render() {
    let flex = 1 / (this.props.widest / this.props.ratio);
    flex = flex !== 0 ? flex : 1;
    const width = SMALLEST_WIDTH * flex;

    return (
      <figure className='db-tile-border' style={{flex, minWidth: width}}>
        {this.props.src}
      </figure>
    );
  }
}
