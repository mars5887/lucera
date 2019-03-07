import React, { Component } from 'react';

import {
  Menu, Dropdown, Icon, Button, message,
} from 'antd';

export default class MADropdown extends Component {

  menu = <Menu onClick={this.props.menuClick} title={'New Tile'}>
            {
              this.props.itemsSource.map( (item, index) => {
                return <Menu.Item key={index}><Icon type="user" />{item.name}</Menu.Item>
              })
            }

          </Menu>

  render() {
    return (
      <div>
      <Dropdown overlay={this.menu}>
        <Button style={{ marginLeft: 8 }}>
          Button <Icon type="down" />
        </Button>
      </Dropdown>

      </div>
    );

  };



}
