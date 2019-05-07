import React, { Component } from 'react';
import { Row, Col, Popover, Select, Timeline, Button, message } from 'antd';
import { SelectSearchObj } from '@';
import { AbstractSelectProps } from 'antd/lib/select';
import api from 'api';

class ServerTable extends Component<any> {
  state = {
    electricLog: [],
    sendData: {
      useType: '',
      cabinetPower: '',
      cabinetType: '',
      costCenterId: '',
      costCenter: '',
      productNameId: '',
      productName: '',
    },
    selectList: {
      cabinetUseType: [],
      cabinetPower: [],
      cabinetType: [],
    },
    costCenterList: [], //陈本中心列表
    productList: {},//产品名列表
  }

  selectStyle = {
    size: 'small' as AbstractSelectProps['size'],
  }

  componentDidMount() {
    this.getSelectList()
  }

  getSelectList = () => {
    api.getIdcPullDownInfo().then(res => {
      this.setState({
        selectList: res.result,
      })
    })
  }

  selectUseType = (value: string) => {
    this.setState({
      sendData: {
        ...this.state.sendData,
        useType: value,
      },
    });
  }

  selectPower = (value: string) => {
    this.setState({
      sendData: {
        ...this.state.sendData,
        cabinetPower: value,
      },
    });
  }

  selectType = (value: string) => {
    if (value === '独享') {
      api.getCostCenterAndProductInfo().then(res => {
        this.setState({
          costCenterList: res.result,
        })
      })
    }
    const params = value === '共享' ? { //如果为共享，则清空成本中心相关数据
      costCenterId: '',
      costCenter: '',
      productNameId: '',
      productName: '',
    } : {};
    this.setState({
      sendData: {
        ...this.state.sendData,
        cabinetType: value,
        ...params,
      },
    })
  }

  selectConstCenter = (selectObj) => {
    const productList = this.state.costCenterList.find(o => o.finance_usage_code === selectObj.finance_usage_code).product;
    this.setState({
      sendData: {
        ...this.state.sendData,
        costCenter: selectObj.use_assets_use,
        costCenterId: selectObj.finance_usage_code,
        productNameId: '',
        productName: '',
      },
      productList,
    });
  }

  selectProduct = (value) => {
    const productNameId = value;
    const productName = this.state.productList[value];
    this.setState({
      sendData: {
        ...this.state.sendData,
        productNameId,
        productName,
      },
    });
  }

  onSubmit = () => {
    const { cabinetNo } = this.props.data;
    const submitData = { cabinetNo, ...this.state.sendData, electricOnOff: '加电' };
    api.electricConfig(submitData).then(() => {
      this.props.onSubmit && this.props.onSubmit();
    })
  }

  checkElectricLog = () => {
    const { data } = this.props;
    api.queryElectricOperateLogs(data.cabinetNo).then(res => {
      this.setState({ electricLog: res.result.log });
    })
  }

  electricOperateLog = (
    <Timeline> {this.state.electricLog.map(item => (
      <Timeline.Item>{item.time} {item.operationType} {item.user}</Timeline.Item>
    ))}
    </Timeline>
  );

  render() {
    const { data } = this.props;
    const { sendData, selectList, costCenterList, productList } = this.state;
    const { useType, cabinetPower, costCenterId, costCenter, cabinetType, productNameId } = sendData;
    return (
      <>
        <div className="rack-data-modal" >
          <Row><Col span={6}>机柜编号</Col><Col span={18}>{data.cabinetNo}</Col></Row>
          <Row>
            <Col span={6}>机柜类型</Col>
            <Col span={18}>
              <Select {...this.selectStyle} onChange={this.selectUseType}>
                {selectList.cabinetType.map(o => (<Select.Option key={o}>{o}</Select.Option>))}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={6}>机柜功率</Col>
            <Col span={18}>
              <Select {...this.selectStyle} onChange={this.selectPower}>
                {selectList.cabinetPower.map(o => (<Select.Option key={o}>{o}</Select.Option>))}
              </Select>
            </Col>
          </Row>
          <Row><Col span={6}>SKU</Col><Col span={18}>{data.sku}</Col></Row>
          <Row><Col span={6}>总U数</Col><Col span={18}>{data.uNum}</Col></Row>
          <Row><Col span={6}>空闲U数</Col><Col span={18}>{data.freeUNum}</Col></Row>
          <Row><Col span={6}>PDU数量</Col><Col span={18}>{data.pduNum}</Col></Row>
          <Row><Col span={6}>插头型号</Col><Col span={18}>{data.plugType}</Col></Row>
          <Row><Col span={6}>使用U数</Col><Col span={18}>{data.userUNum}</Col></Row>
          <Row><Col span={6}>外网</Col><Col span={18}>{data.outNetEnvironment}</Col></Row>
          <Row><Col span={6}>内网</Col><Col span={18}>{data.insideNetEnvironment}</Col></Row>
          <Row>
            <Col span={6}>使用类型</Col>
            <Col span={18}>
              <Select {...this.selectStyle} onChange={this.selectType}>
                {selectList.cabinetUseType.map(o => (<Select.Option key={o}>{o}</Select.Option>))}
              </Select>
            </Col>
          </Row>
          <Row><Col span={6}>机柜状态</Col><Col span={18}>{data.cabinetStatus}</Col></Row>
          <Row>
            <Col span={6}>下电时间</Col>
            <Col span={18}>
              <Popover content={this.electricOperateLog} trigger="click">
                <a onClick={this.checkElectricLog}>{data.electricOnTime}</a>
              </Popover>
            </Col>
          </Row>
          {cabinetType === '独享' &&
            <>
              <Row>
                <Col span={6}>成本中心</Col>
                <Col span={18}>
                  <SelectSearchObj
                    {...this.selectStyle}
                    value={{ use_assets_use: costCenter, finance_usage_code: costCenterId }}
                    onChange={this.selectConstCenter}
                    optionMap={{
                      children: 'use_assets_use',
                      value: 'finance_usage_code',
                    }}
                    options={costCenterList}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={6}>产品名</Col>
                <Col span={18}>
                  <Select {...this.selectStyle} value={productNameId} onChange={this.selectProduct}>
                    {Object.keys(productList).map(o => (<Select.Option key={o} value={o}>{productList[o]}</Select.Option>))}
                  </Select>
                </Col>
              </Row>
            </>
          }
        </div>
        <div style={{ textAlign: 'center', marginTop: '25px' }}>
          <Button disabled={!(useType && cabinetPower && cabinetType)} type="primary" onClick={this.onSubmit}>确定</Button>
        </div>
      </>
    );
  }
}

export default ServerTable;
