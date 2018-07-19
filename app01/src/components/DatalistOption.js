import React, { Component } from 'react';

class DatalistOption extends Component {

  render() {
    if (this.props.name) {
      return (
        <option value={this.props.name} />
      )
    }
    return null;
  }
}

export default DatalistOption;