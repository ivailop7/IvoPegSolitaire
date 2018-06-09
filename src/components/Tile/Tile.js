import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Tile extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? 'grey' : 'white';
    const stroke = black ? 'white' : 'black';

    return (
      <div style={{
        backgroundColor: fill,
        opacity: 0.7,
        color: stroke,
        width: '100%',
        height: '100%'
      }}>
        {this.props.children}
      </div>
    );
  }
}

Tile.propTypes = {
  black: PropTypes.bool
};