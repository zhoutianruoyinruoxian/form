import React, { SFC } from 'react';
import { Header } from '@';
import { HeaderProps } from '../Header/Header';
import './style.scss';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  menuLeft?: React.ReactNode;
  menuRight?: React.ReactNode;
}

interface ContentProps {
  breadCrumb?: HeaderProps['breadCrumb'];
}

const Content: SFC<ContentProps> = (props) => {
  const { className, menuLeft, menuRight, breadCrumb, children } = props;
  return (
    <div className={`main-content ${className || ''}`}>
      <Header breadCrumb={breadCrumb} />
      {(menuLeft || menuRight) &&
        <div className="sub-title clearfix"
          style={{
            marginBottom: '24px'
          }}
        >
          <div className="menu-left">
            {menuLeft}
          </div>
          <div className="menu-right">
            {menuRight}
          </div>
        </div>
      }
      <div className="content-section">
        {children}
      </div>
    </div >
  )
}
export default Content;
