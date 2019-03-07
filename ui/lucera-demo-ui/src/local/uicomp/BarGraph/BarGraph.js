/*
Roll your own Bar Graph using Vector Grapic
*/

import React, { Component } from 'react'
import './BarGraph.css'
import { Spin } from 'antd';

export default class BarGraph extends Component {

  constructor() {
    super();
    this.state = {
      data:[]
    }
  }

  render() {
    let barHeight = 30
    let barGroups={}

    if ( this.props.data && this.props.data.length >0) {
      barGroups = this.props.data.filter(value => Object.keys(value).length !== 0).map( (d, i) => {

          return <g key={i} transform={`translate(0, ${i * barHeight})`}>
            <BarGroup d={d} barHeight={barHeight} />
          </g>


      });
      return (
        <div className="chart-body">
          <svg width="800" height={barGroups.length*40} >
            <g className="container">
              <text className="title" x="10" y="30">{this.props.title}</text>
              <g className="chart" transform="translate(100,60)">
                {barGroups}
              </g>
            </g>
          </svg>
        </div>
      );
    }
    else {
      return (<Spin size="large" />);
    }
  }
};

function BarGroup(props) {
  let barPadding = 2
  let barColour = '#4c94de'
  let widthScale = d => d * 50

  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5

  return (
    <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.name}</text>
      <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
      <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
    </g>
  )
}
