import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import { format } from 'html-format';
import Panel from '../components/Panel';
import fieldClick from '../actions/fieldClick';
import ResetButton from '../components/ResetButton';
import SaveButton from '../components/SaveButton';

class TemplateContent extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (e.target.className !== 'editable') return;
    const tmp = document.querySelectorAll('.editable');
    [...tmp].forEach(e => e.classList.remove('edit'));
    e.target.classList.toggle('edit');
    this.props.onclick();
    return null;
  }

  render() {
    if (!this.props.activeTemplateHTML) return <p>Choose template.</p>;
    return (
      <div className="wrapper">
        <div className="html-block">
          <div className="flex">
            <div>
              <h3>Template (HTML):</h3>
              <p className="html-p">{this.props.activeTemplateHTML}</p>
            </div>
            <ResetButton />
          </div>
        </div>
        <div className="rendered">
          <div className="flex">
            <div>
              <h3>Template (rendered):</h3>
              <div
                onClick={this.onClick}
                dangerouslySetInnerHTML={{
                  __html: this.props.activeTemplateHTML
                }}
              />
              <div className="panel">
                <Panel />
              </div>
            </div>
            <SaveButton />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ activeTemplateHTML: state.activeTemplateHTML }),
  dispatch => ({
    onclick: bindActionCreators(fieldClick, dispatch)
  })
)(TemplateContent);
