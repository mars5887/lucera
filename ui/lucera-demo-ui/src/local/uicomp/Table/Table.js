/*
  This is an antd table pulled right from their components documentation,
  modified to fit my needs. This is an example of using 3rd party components.
*/

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {
  Table, Switch, Radio, Form, Collapse, Button,
} from 'antd';

const FormItem = Form.Item;
const Panel = Collapse.Panel;

const showHeader = true;
const footer = () => 'Here is footer';
const scroll = { y: 240 };
//const pagination = { position: 'bottom' };

class MarsTable extends Component {

  constructor() {
    super();
    this.state = {
      filteredInfo: null,
      sortedInfo: null,
      pagination: { onChange: this.handlePageChange, position: 'bottom' },
      size: 'default',
      showHeader,
      footer,
      rowSelection: {},
      scroll: undefined,
      hasData: true,
      lastId:'',
      pageSize:100,
      sort:'TIME',
      needsPages: true
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleChange = (pagination, filters, sorter) => {
      //console.log('Various parameters', pagination, filters, sorter);
      this.setState({
        filteredInfo: filters,
        sortedInfo: sorter,
      });
    }

  handlePageChange = (page, pageSize) => {
    const numPages = this.state.data.length/pageSize;
    if ( page === numPages ) {
      this.setState({
        needsPages:true
      })
    }
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  handleSortChange = (e) => {
    this.setState({ sort: e.target.value, hasData: false,data:[] });
  }

  handleFooterChange = (enable) => {
    this.setState({ footer: enable ? footer : undefined });
  }

  handleRowSelectionChange = (enable) => {
    this.setState({ rowSelection: enable ? {} : undefined });
  }

  handleScollChange = (enable) => {
    this.setState({ scroll: enable ? scroll : undefined });
  }

  handlePaginationChange = (e) => {
    const { value } = e.target;
    this.setState({
      pagination: value === 'none' ? false : { position: value },
    });
  }

  setBidPriceSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: '4',
      },
    });
  }

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  }

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  }


  getSearchQuery() {
    let searchQ = this.state.lastId ? `?lastId=${this.state.lastId}`:'';
    searchQ += (searchQ && this.state.sort)
                  ? `&sort=${this.state.sort}`
                  : ( this.state.sort?`?sort=${this.state.sort}`:'');
    searchQ += (searchQ && this.state.pageSize)
                  ? `&pgsize=${this.state.pageSize}`
                  : ( this.state.pageSize?`?pgsize=${this.state.pageSize}`:'');

    return searchQ;
  }

  fetchBids(appendData) {
    fetch(`http://localhost:3030/bids${this.getSearchQuery()}`)
    .then( response => {
        return response.json();
    })
    .then( jsonData => {
        let newData;
        if ( this.state.data && this.state.data.length > 0 ) {
          if ( appendData ) {
            newData = this.state.data.concat(jsonData);
          }
        }

        this.setState( {
          needsPages:false,
          hasData:true,
          data: newData?newData:jsonData,
          lastId: jsonData[jsonData.length - 1]._id
        } );
      });
  }

  componentDidMount() {
      this.fetchBids();
  }

  componentDidUpdate( prevState, prevProps ) {
    if( (prevProps.sort !== this.state.sort) ||
          (this.state.needsPages) ) {
      this.fetchBids(this.state.needsPages);
    }
  }

  renderDate  = (value, row, index) => {
    if( value ) {
      let date = new Date(value)
      const obj = {
          children: date.toLocaleDateString(),
          props: {},
        };
      return obj;
    }
  }

  renderTime  = (value, row, index) => {
    if( value ) {
      let date = new Date(value)
      const obj = {
          children: date.toLocaleTimeString(),
          props: {},
        };
      return obj;
    }
  }
  renderMillis  = (value, row, index) => {
    if( value ) {
      let date = new Date(value)
      const obj = {
          children: date.getUTCMilliseconds(),
          props: {},
        };
      return obj;
    }
  }

  renderCheckBid  = (value, row, index) => {
    if( value && row ) {
      if( row.bid.bid_price < row.bid.ask_price) {
        return (
          <span>
            <div style={{ color: 'red' }}>{value}</div>
          </span>
        )
      }
      else {
        return (
          <span>
            <div style={{ color: 'green' }}>{value}</div>
          </span>
        )
      }

    }
  }

  renderCheckBidQnty  = (value, row, index) => {
    if( value && row ) {
      if( row.bid.bid_quantity < row.bid.ask_quantity) {
        return (
          <span>
            <div style={{ color: 'red' }}>{value}</div>
          </span>
        )
      }
      else {
        return (
          <span>
            <div style={{ color: '#52c41a' }}>{value}</div>
          </span>
        )
      }

    }
  }


  render() {
    const state = this.state;
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [
      {
        title: 'Date',
        dataIndex: 'bid.ts',
        key: 'date',
        width: 50,
        render:this.renderDate,
      },
      {
        title: 'Time',
        dataIndex: 'bid.ts',
        key: 'time',
        width: 130,
        render:this.renderTime,
      },
      {
        title: 'Milli Seconds',
        dataIndex: 'bid.ts',
        key: 'millis',
        width: 50,
        render:this.renderMillis,
      },
    {
      title: 'LP',
      dataIndex: 'bid.lp',
      key: 'lp',
      width: 70,
      sorter: (a, b) => a.bid.lp.localeCompare(b.bid.lp),
      sortOrder: sortedInfo.columnKey === 'lp' && sortedInfo.order,
      filters: [
        { text: 'LP0', value: 'LP0' },
        { text: 'LP1', value: 'LP1' },
        { text: 'LP2', value: 'LP2' },
        { text: 'LP3', value: 'LP3' },
        { text: 'LP4', value: 'LP4' },
        { text: 'LP5', value: 'LP5' },
        { text: 'LP6', value: 'LP6' },
        { text: 'LP7', value: 'LP7' },
        { text: 'LP8', value: 'LP8' },
        { text: 'LP9', value: 'LP9' },
      ],
      filteredValue: filteredInfo.lp || null,
      onFilter: (value, record) => record.bid.lp?record.bid.lp.includes(value):false,
    }, {
      title: 'Symbol',
      dataIndex: 'bid.sym',
      key: 'symbol',
      width: 70,
      sorter: (a, b) => a.bid.sym.localeCompare(b.bid.sym),
      sortOrder: sortedInfo.columnKey === 'symbol' && sortedInfo.order,
    }, {
      title: 'Bid Price',
      dataIndex: 'bid.bid_price',
      key: 'bidprice',
      sorter: (a, b) => a.bid.bid_price - b.bid.bid_price,
      sortOrder: sortedInfo.columnKey === 'bidprice' && sortedInfo.order,
      render: this.renderCheckBid
    }, {
      title: 'Bid Quantity',
      dataIndex: 'bid.bid_quantity',
      key: 'bidquantity',
      render:this.renderCheckBidQnty
    }, {
      title: 'Ask Price',
      dataIndex: 'bid.ask_price',
      key: 'askprice',
    }, {
      title: 'Ask Quantity',
      dataIndex: 'bid.ask_quantity',
      key: 'askquantity',
    }];

    return (
      <div>
        <div className="components-table-demo-control-bar">
          <Form layout="inline">
          <Collapse defaultActiveKey="1">
          <Panel>
            <div className="table-operations">
              <Button onClick={this.clearFilters}>Clear filters</Button>
              <Button onClick={this.clearAll}>Clear filters and sorters</Button>
            </div>
            <FormItem label="Sort">
              <Radio.Group sort="time" value={state.sort} onChange={this.handleSortChange}>
                <Radio.Button value="TIME">Time</Radio.Button>
                <Radio.Button value="LP">LP</Radio.Button>
                <Radio.Button value="SYMBOL">Symbol</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="Footer">
              <Switch checked={!!state.footer} onChange={this.handleFooterChange} />
            </FormItem>

            <FormItem label="Fixed Header">
              <Switch checked={!!state.scroll} onChange={this.handleScollChange} />
            </FormItem>

            <FormItem label="Size">
              <Radio.Group size="default" value={state.size} onChange={this.handleSizeChange}>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="middle">Middle</Radio.Button>
                <Radio.Button value="small">Small</Radio.Button>
              </Radio.Group>
            </FormItem>
            <FormItem label="Pagination">
              <Radio.Group
                value={state.pagination ? state.pagination.position : 'none'}
                onChange={this.handlePaginationChange}
              >
                <Radio.Button value="top">Top</Radio.Button>
                <Radio.Button value="bottom">Bottom</Radio.Button>
                <Radio.Button value="both">Both</Radio.Button>
                <Radio.Button value="none">None</Radio.Button>
              </Radio.Group>
            </FormItem>
            </Panel>
            </Collapse>
          </Form>
        </div>

        <Table {...this.state} columns={columns} dataSource={state.hasData ? state.data : null} onChange={this.handleChange} />
      </div>
    );
  }
}
export default MarsTable
