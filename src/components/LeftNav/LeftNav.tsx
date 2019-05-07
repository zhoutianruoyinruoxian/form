import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { NIOPSURL } from 'src/constant/main';
import isEqual from 'lodash-es/isEqual';
import menuList from 'src/config/menuList';
import logo from 'src/source/img/logo.svg';
import './style.scss';

const { Sider } = Layout;

const initialState = {
  selectedKeys: [],
}

type Istate = Readonly<typeof initialState>;

class LeftNav extends React.PureComponent<any, Istate> {
  readonly state: Istate = initialState;

  componentDidMount() {
    const MenuKey = this.getMenuKey(this.props.location.pathname);
    this.setState({
      selectedKeys: [MenuKey],
    })
  }

  componentWillReceiveProps(nextProps: any) {
    const oldMenuKey = this.getMenuKey(this.props.location.pathname);
    const newMenuKey = this.getMenuKey(nextProps.location.pathname);
    if (isEqual(oldMenuKey, newMenuKey)) return;
    this.setState({
      selectedKeys: [newMenuKey],
    })
  }

  getMenuKey = (path: string) => path.match(/\/[a-zA-Z0-9]*/g)[0];

  render() {
    const { selectedKeys } = this.state;
    return (
      <Sider width={160} style={{ background: '#fff' }}>
        <div className="left-nav-title ant-menu-dark">
          <img alt="logo" src={logo} />
        </div>
        <Menu
          className="left-nav-menu"
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
        // defaultOpenKeys={['sub1']}
        >
          {menuList.map((o, i) => (
            <Menu.Item key={o.path ? this.getMenuKey(o.path) : 'undefined' + i}>
              {o.path ?
                <Link to={o.path}>
                  {o.icon && <Icon type={o.icon} />}
                  {o.text}
                </Link>
                :
                <span>
                  {o.icon && <Icon type={o.icon} />}
                  {o.text}
                </span>
              }
            </Menu.Item>
          ))}
        </Menu>
      </Sider >
    );
  }
}

export default withRouter(LeftNav);
