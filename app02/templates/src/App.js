import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, NavLink } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import TemplateList from './containers/TemplateList';
import TemplateContent from './containers/TemplateContent';
import { bindActionCreators } from 'redux';
import './App.css';
import getTemplates from './actions/getTemplates';

const history = createBrowserHistory();

class App extends Component {
  //constructor(props) {
  //super(props);
  //this.state = { templates: [], activeItemId: '', panel: { visible: false } };
  //this.templateClickHandler = this.templateClickHandler.bind(this);
  //this.setVisibility = this.setVisibility.bind(this);
  //}

  componentDidMount() {
    this.props.getTemplates();
  }

  /*getTemplates() {
    setTimeout(this.setState({ templates: templates }), 1000);
  }

  templateClickHandler(id) {
    this.setState({ activeItemId: id });
  }

  setVisibility() {
    this.setState({ panel: { visible: !this.state.panel.visible } });
  } */

  render() {
    return (
      <Router history={history}>
        <div className="main_wrapper">
          <header className="header">
            React ..... React-Router ..... Redux ..... Redux-Thunk
          </header>
          <aside className="sidebar">
            <NavLink
              className="sidebarlink"
              activeClassName="active"
              exact
              to="/"
            >
              Templates List
            </NavLink>
            <NavLink
              className="sidebarlink"
              activeClassName="active"
              to="/content"
            >
              Template Content
            </NavLink>
          </aside>
          <main className="main">
            <Route path="/" exact component={TemplateList} />
            <Route path="/content" exact component={TemplateContent} />
          </main>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    templates: state.templates,
    activeTemplateId: state.activeTemplateId,
    activeTemplateHTML: state.activeTemplateHTML,
    showButton: state.showResetButton,
    showPanel: state.showPanel
  };
}

export default connect(
  mapStateToProps,
  dispatch => ({
    getTemplates: bindActionCreators(getTemplates, dispatch)
  })
)(App);
