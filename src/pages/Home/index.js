import React, { Component } from 'react';
import { Button } from 'antd';

export default class Home extends Component {

  render() {
    return (
      <div>
        <Button type="primary">react</Button>
        <Button type="primary">react-router</Button>
        <Button type="primary">axios</Button>
        <Button type="primary">antd</Button>
      </div>
    )
  }
}