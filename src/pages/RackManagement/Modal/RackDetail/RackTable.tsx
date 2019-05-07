import React, { useState, useEffect, SFC } from 'react';
import { Row, Col, Popover, Timeline } from 'antd';
import moment from 'moment';
import api from 'api';

const timeTransform = (date: Date) => moment(date).format('YYYY-MM-DD hh:mm:ss');

const ServerTable: SFC<any> = (props) => {
  const { data, electricStatus } = props;
  const [electricLog, setElectricLog] = useState([]);

  useEffect(() => {
    data.electricOnTime && api.queryElectricOperateLogs({ cabinetNo: data.cabinetNo }).then(res => {
      setElectricLog(res.result.log);
    })
  }, [props.data.cabinetNo, props.data.electricOnTime])

  const electricOperateLog = () => (
    <div style={{ paddingTop: '10px' }}>
      <Timeline>
        {electricLog.map((item, index) => (
          <Timeline.Item key={index}>{timeTransform(item.time)} {item.operationType} {item.user}</Timeline.Item>
        ))}
      </Timeline>
    </div>
  );

  return (
    <div className="rack-data-modal">
      <Row><Col span={9}>机柜编号</Col><Col span={15}>{data.cabinetNo}</Col></Row>
      <Row><Col span={9}>机柜类型</Col><Col span={15}>{data.cabinet_use}</Col></Row>
      <Row><Col span={9}>机柜功率</Col><Col span={15}>{data.cabinetPower}</Col></Row>
      <Row><Col span={9}>SKU</Col><Col span={15}>{data.sku}</Col></Row>
      <Row><Col span={9}>总U数</Col><Col span={15}>{data.uNum}</Col></Row>
      <Row><Col span={9}>空闲U数</Col><Col span={15}>{data.freeUNum}</Col></Row>
      <Row><Col span={9}>PDU数量</Col><Col span={15}>{data.pduNum}</Col></Row>
      <Row><Col span={9}>插头型号</Col><Col span={15}>{data.plugType}</Col></Row>
      <Row><Col span={9}>使用U数</Col><Col span={15}>{data.userUNum}</Col></Row>
      <Row><Col span={9}>外网</Col><Col span={15}>{data.outNetEnvironment}</Col></Row>
      <Row><Col span={9}>内网</Col><Col span={15}>{data.insideNetEnvironment}</Col></Row>
      <Row><Col span={9}>使用类型</Col><Col span={15}>{data.cabinetType}</Col></Row>
      <Row><Col span={9}>机柜状态</Col><Col span={15}>{data.cabinetStatus}</Col></Row>
      <Row>
        <Col span={9}>{electricStatus ? '上' : '下'}电时间</Col>
        <Col span={15}>
          {data.electricOnTime ?
            <Popover
              content={electricOperateLog()}
              trigger="click"
            >
              <a href="javascript:;">{timeTransform(data.electricOnTime)}</a>
            </Popover> :
            '暂无上下电数据'
          }
        </Col>
      </Row>
      <Row><Col span={9}>成本中心</Col><Col span={15}>{data.costCenter}</Col></Row>
    </div >
  );
}

export default ServerTable;
