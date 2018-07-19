import React, { Component } from 'react';
import DatalistOption from './DatalistOption.js'
import { DebounceInput } from 'react-debounce-input';

class CitySearchInput extends Component {

  onChangeHandler = (e) => {
    this.props.change(e.target.value);
  }

  onKeyHandler = (e) => {
    this.props.getFC(e.target.value);
  }

  render() {
    return (
      <div className="inputWrapper">
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          className="input"
          placeholder="Search..."
          type="text"
          onChange={this.onChangeHandler}
          onKeyUp={(e) => e.key === 'Enter' ? this.onKeyHandler(e) : null}
          onFocus={(e) => e.target.value = ''}
          list='cities'
        />
        <datalist id='cities'>
          {this.props.hint.map(e => <DatalistOption key={e.name} name={e.name} />)}
        </datalist>
      </div>
    );
  }
}

export default CitySearchInput;