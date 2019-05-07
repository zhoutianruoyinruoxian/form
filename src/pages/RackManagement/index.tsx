import React, { useState, useEffect, Component } from 'react';
import { Select, Button, Row } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { Content, TableX } from '@';
import { Link } from 'react-router-dom';
import api from 'api';
import menuList from 'src/config/menuList';
import './style.scss';

export default function RackRoom(props: any) {
  const [idcCity, setIdcCity] = useState('');
  const [idcNo, setIdcNo] = useState('');
  const [sendData, setSendData] = useState(undefined);
  const [areaOptions, setAreaOptions] = useState([]);
  const [idcOptions, setIdcOptions] = useState([]);

  useEffect(() => {
    api.getIdcCity().then(({ result }) => {
      setAreaOptions(result);
    });
    api.getIdcNo().then(({ result }) => {
      setIdcOptions(result);
    });
  }, [])

  const onClick = (type: string) => {
    const sendData = type === 'area' ? { idcCity } : { idcNo }
    setSendData(sendData);
  }

  const onAreaChange = (value: string) => {
    setIdcCity(value);
  }

  const onIdcChange = (value: string) => {
    setIdcNo(value);
  }

  const columns: ColumnProps<any>[] = [
    {
      title: 'IDC编号',
      dataIndex: 'idcNo',
      key: 'idcNo',
    },
    {
      title: 'IDC名称',
      dataIndex: 'idcName',
      key: 'idcName',
    },
    // {
    //   title: '地址',
    //   dataIndex: 'idcAddress',
    //   key: 'idcAddress',
    // },
    {
      title: '房间号',
      dataIndex: 'idcRoomNo',
      key: 'idcRoomNo',
    },
    {
      title: '查看',
      key: 'operate',
      render: (text, record) => {
        return (<Link to={menuList.find(o => o.text === '机架管理').path + '/' + record.idcNo + '_' + record.idcRoomNo}>机架密度详情</Link>);
      }
    },
  ]

  return (
    <Content className="rack-room" breadCrumb={['机架管理']}>
      <Row>
        <label>按区域选择: </label>
        <Select placeholder="按区域选择" allowClear onChange={onAreaChange} >
          {areaOptions.map(o => (<Select.Option value={o} key={o}>{o}</Select.Option>))}
        </Select>
        <Button type="primary" disabled={!idcCity} onClick={() => onClick('area')}>提交</Button>
      </Row>
      <Row>
        <label>按IDC编号选择: </label>
        <Select placeholder="按IDC编号选择" allowClear onChange={onIdcChange} >
          {idcOptions.map(o => (<Select.Option value={o} key={o}>{o}</Select.Option>))}
        </Select>
        <Button type="primary" disabled={!idcNo} onClick={() => onClick('idc')}>提交</Button>
      </Row>
      {sendData && <Row>
        <TableX
          rowKey={(record) => record.idcNo + record.idcRoomNo}
          autoRefresh
          columns={columns}
          params={sendData}
          api={api.getIdc}
        />
      </Row>}
    </Content>
  )
} 