import React, { Component } from 'react';

import {
  Menu, Dropdown, Icon, message,
} from 'antd';

export default class MADropdown extends Component {

  handleButtonClick = (e) => {
    message.info('Drop Down Button clicked.');
    console.log('click left button', e);
  }

  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  menu = <Menu onClick={this.handleMenuClick}>
            <Menu.Item key="1"><Icon type="user" />Grid</Menu.Item>
            <Menu.Item key="2"><Icon type="user" />Round Gauge</Menu.Item>
            <Menu.Item key="3"><Icon type="user" />Line Gauge</Menu.Item>
            <Menu.Item key="4"><Icon type="user" />Bar Graph</Menu.Item>
          </Menu>

  render() {
    return (
      <div>
        <Dropdown.Button onClick={this.handleButtonClick} overlay={this.menu}>
          Dropdown
        </Dropdown.Button>

      </div>
    );

  };



}
