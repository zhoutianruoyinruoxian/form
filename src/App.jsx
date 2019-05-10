import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import './App.css';
import { Header, LeftNav, Footer } from 'src/components';


// const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const mapStateToProps = (state, router) => {
  return {
    userInfo: state.app.userInfo,
  };
};

const mapDispatchToProps = () => {
  return {
    getUserInfo: mapMutations.app.getUserInfo,
  };
};

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {

  componentDidMount() {

    this.props.getUserInfo();
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.userInfo) === '{}') {
      nextProps.getUserInfo();
    }
  }

  render() {
    return (
      <div className="App">
        <Layout>
          <LeftNav />
          <Layout>
            <Content>
              {this.props.children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
