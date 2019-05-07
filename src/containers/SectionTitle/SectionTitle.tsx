import React, { SFC } from 'react';
import './style.scss';

interface InitProps {
  className: string,
  children: string,
}

export type Iprops = Readonly<InitProps>

const SectionTitle: SFC<Iprops> = ({
  className = '',
  children = '标题',
}) => {

  return (
    <h2 className={`section-title ${className}`}>{children}</h2>
  )
}

export default SectionTitle;