import React, { SFC, ReactText } from 'react';
import basePropTypes from 'src/config/BasePropsType';
import './style.scss';

interface BlockTitleProps extends basePropTypes {
  title?: ReactText;
}

const BlockTitle: SFC<BlockTitleProps> = (props) => {
  const { className, title, children, ...args } = props;
  return (
    <div className={`block-title ${className || ''}`} {...args}>
      <h3>{title}</h3>
      <section>{children}</section>
    </div>
  )
}

export default BlockTitle;