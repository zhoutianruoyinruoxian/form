import React, { SFC, ReactText } from 'react';
import './style.scss';


const Block: SFC<any> = (props) => {
  const { data, onClick } = props;
  const blockClick = () => onClick && onClick(data);
  const getClass = () => {
    if (data.electricOnOff === '加电') {
      if (data.freeUNum > 0) return 'active';
      return 'full';
    }
    return '';
  }

  return (
    <section
      className={`rock-block ${getClass()}`}
      onClick={blockClick}
      title={data.cabinetNo + '\n' + data.sku + ' 剩余:' + data.freeUNum}
    >
      <h4>{data.cabinetNo}</h4>
      <p>{data.sku}<span>剩余:{data.freeUNum}U</span></p>
    </section>
  )
}

export default Block;