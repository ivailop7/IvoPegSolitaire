import React, { Component } from 'react';

export default class Tile extends Component {
  render() {
    return (
      <div style={this.props.tileStyle}>
        {this.props.children}
      </div>
    );
  }
}