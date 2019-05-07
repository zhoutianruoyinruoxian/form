import * as React from 'react';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import { withRouter, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Icon } from 'antd';
import { NIOPSURL, NIOPSURLHELP } from 'src/constant/main';
import menuList from 'src/config/menuList';
import './style.scss';

const { Header } = Layout;

interface Crumb {
  path?: string;
  text: string;
}

export interface HeaderProps {
  breadCrumb?: Array<string | Crumb>;
  userInfo?: any;
  logout?(): any;
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.app.userInfo,
  };
};

const mapDispatchToProps = () => {
  return {
    logout: mapMutations.app.logout,
  };
};

function MainHeader(props: HeaderProps) {
  const { breadCrumb, userInfo } = props;
  const onMenuClick = ({ key }) => {
    if (key === 'logout') {
      props.logout();
    }
  };

  const menu = (
    <Menu
      className="o"
      selectedKeys={[]}
      onClick={onMenuClick}
      style={{ marginTop: 5 }}
    >
      <Menu.Item key="logout">
        <Icon type="logout" />退出登录
        </Menu.Item>
    </Menu>
  );

  return (
    <Header tagName="header" className="header main-header clearfix">
      <Breadcrumb className="main-header-breadcrumb">
        {breadCrumb && breadCrumb.map((item, i) => {
          if (typeof item === 'string') {
            return <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
          }
          return <Breadcrumb.Item key={i}><Link to={item.path}>{item.text}</Link></Breadcrumb.Item>
        })
        }
      </Breadcrumb>
      <div className="user-section">
        {userInfo.name ?
          <Dropdown className="user-info" overlay={menu}>
            <span>
              <Avatar
                size="default"
                alt="avatar"
                className="avatar"
                icon="user"
              />
              <span className="nickname">{userInfo.name}，你好！</span>
            </span>
          </Dropdown> :
          <span>请登录</span>
        }
      </div>
    </Header>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
