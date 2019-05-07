import React, { SFC, ReactText } from 'react';
import basePropTypes from 'src/config/BasePropsType';
// import './style.scss';

interface DetailTitleProps extends basePropTypes {
  title?: ReactText;
}

const DetailTitle: SFC<DetailTitleProps> = (props) => {
  const { className, title, children, ...args } = props;
  return (
    <div className={`detail-title ${className || ''}`} {...args}>
    <a/>
    </div>
  )
}

export default DetailTitle;