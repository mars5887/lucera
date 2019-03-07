/*
Dashboard Tile Conmponent Used to Add and Remove Content
 */

import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {
  Divider, Collapse, Button
} from 'antd';
const Panel = Collapse.Panel;

const collapsed = record => <div>{record?record.description:undefined}</div>;

const btnLink = {
  backgroundColor: 'transparent',
  border: 'none'
};
export default class Tile extends Component {

  callback = (key) => {
    console.log(key);
  }

  remove = () => {
    this.props.remove(this.props.index)
  }

  // TODO: bild an edit modal to add tiles
  edit = () => {
    this.props.add(this.props.index)
  }

  handleCollapsedChange = (enable) => {
    this.setState({ collapsed: enable ? collapsed : undefined });
  }

  render() {
    return <div className="tile" draggable="true">
      <div style={{ borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ flexGrow:1, color: '#005c9c', fontWeight: 'bold' }}>
          { this.props.header }
        </div>
        <div className="buttons">
        <span>
          <Divider type="vertical" />
          <Button style={btnLink} onClick={this.remove}>Delete</Button>
          <Divider type="vertical" />
          <Button style={btnLink} onClick={this.edit}>Edit</Button>
          <Divider type="vertical" />
        </span>
        </div>
      </div>
      <Collapse defaultActiveKey={['1']} onChange={this.callback}>
      <Panel key="1">
        <div style={{ display: 'flex', alignItems: 'center', minHeight: '300px', minWidth: '245px'}}>
          <div style={{width: '100%'}}>{ this.props.content }</div>
        </div>
      </Panel>
      </Collapse>
    </div>
  }
};
