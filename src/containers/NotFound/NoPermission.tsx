import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

export default function NotFound() {
  return (
    <div className="not-found">
      {/* <img style={{ marginBottom: '20px', maxWidth: 150, maxHeight: 150 }} src={NotFoundImg} alt="" /> */}
      <h1 style={{ marginBottom: '10px' }}>抱歉，您要找的页面不存在（404）</h1>
      <h3 style={{ marginBottom: '10px' }}>您可以尝试前往</h3>
      <Link to="/"><Button>首页</Button></Link>
    </div>
  );
}