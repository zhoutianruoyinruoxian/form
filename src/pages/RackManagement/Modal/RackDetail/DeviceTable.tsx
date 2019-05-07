import React, { Component } from 'react';
import basePropTypes from 'src/config/BasePropsType';
import { Row, Col, Select } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { SelectSearch } from '@';
import api from 'api';
import isEqual from 'lodash/isEqual';
import './style.scss';

interface DeviceTableState {
  type: 'info' | 'details';
  [name: string]: any;
}

class DeviceTable extends Component<any, DeviceTableState> {
  state: DeviceTableState = {
    type: 'info',
    simple: [], //simple基础属性
    advanced: { //高级属性
    }
  }

  componentDidMount() {
    this.getData()
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.params, this.props.params)) {
      this.getData(nextProps)
    }
  }

  getData = (props = this.props) => {
    const { params } = props;
    const { type } = this.state;
    const sendData = { type, ...params };

    api.queryEquipmentInfoAndDetails(sendData).then(res => {
      this.setState({
        simple: res.result.info || [],//info和details是根据type分开返回的，逻辑写在一起了,如果不存在就赋值初始空值，防止变成undefined导致页面报错
        advanced: res.result.details || {},
      })
    })
  }

  changeType = (type: DeviceTableState['type']) => {
    this.setState({
      type,
    }, this.getData)
  }

  list = (data: any[], title: string) => (
    data && <>
      <Row><Col span={24} style={{ textAlign: 'center' }}>{title}</Col></Row>
      {data.map((item, index) => (
        <Row key={index}><Col span={7}>{item.name}</Col><Col span={14}>{item.model}</Col><Col span={3}>{item.num}</Col></Row>
      ))}
    </>
  )

  render() {
    const { simple, type, advanced } = this.state;
    return (
      <div className="rack-data-modal">
        <div className="rack-data-title">
          <a className={type === 'info' ? ' active' : ''} onClick={() => type === 'details' && this.changeType('info')}>基本</a>
          <a className={type === 'details' ? ' active' : ''} onClick={() => type === 'info' && this.changeType('details')}>高级</a>
        </div>
        {type === 'info' && simple.map((item, index) => (
          <Row key={index}><Col span={9}>{item.key}</Col><Col span={15}>{item.value}</Col></Row>
        ))}
        {type === 'details' && (
          <>
            {this.list(advanced.hardwareInfo, '硬件属性')}
            {this.list(advanced.netInfo, '网络属性')}
          </>
        )}
      </div >
    );
  }
}

export default DeviceTable;