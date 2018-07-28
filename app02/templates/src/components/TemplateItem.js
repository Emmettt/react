import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import templateSelect from '../actions/templateSelect';
import { Link } from 'react-router-dom';

class TemplateItem extends Component {
  onclick = (id, template) => {
    this.props.templateClickHandler({ id, template });
  };

  render() {
    let date = new Date(this.props.modified);
    const options = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    date = date.toLocaleString('ru', options);

    return (
      <tr className="row">
        <td
          onClick={() => {
            this.onclick(this.props.template.id, this.props.template.template);
          }}
        >
          <Link className="routerlink" to="/content">
            {this.props.template.name}
          </Link>
        </td>
        <td>{date}</td>
      </tr>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    templateClickHandler: bindActionCreators(templateSelect, dispatch)
  })
)(TemplateItem);
