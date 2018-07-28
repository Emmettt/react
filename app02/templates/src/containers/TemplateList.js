import React, { Component } from 'react';
import { connect } from 'react-redux';
import TemplateItem from '../components/TemplateItem';

class TemplateList extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Template</th>
            <th>Modified</th>
          </tr>
          {this.props.list.map(e => (
            <TemplateItem key={e.id} template={e} modified={e.modified} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default connect(state => ({ list: state.templates }))(TemplateList);
