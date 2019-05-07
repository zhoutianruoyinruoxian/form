import React from 'react';
import { Input, Button } from 'antd';
import './style.scss';

export default function SearchSection(props) {
  const { className, onChange, onSearch } = props;
  return (
    <div className={`search-section ${className || ''}`}>
      <Input placeholder="页面/权限名称" onChange={onChange} />
      <Button className="search-btn" type="primary" onClick={onSearch}>查询</Button>
    </div>
  );
}
