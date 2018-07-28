import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import saveTemplates from '../actions/saveTemplates';

class SaveButton extends Component {
  render() {
    if (!this.props.visible)
      return (
        <Link className="saveButton" to="/">
          Back
        </Link>
      );
    return (
      <Link onClick={this.props.saveClick} className="saveButton" to="/">
        Save
      </Link>
    );
  }
}

export default connect(
  state => ({ visible: state.showButton }),
  dispatch => ({
    saveClick: bindActionCreators(saveTemplates, dispatch)
  })
)(SaveButton);
