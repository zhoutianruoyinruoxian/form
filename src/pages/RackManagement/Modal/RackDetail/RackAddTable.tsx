import React, { Component } from 'react';
import basePropTypes from 'src/config/BasePropsType';
import { Row, Col, Button, Select, Input } from 'antd';
import { AbstractSelectProps } from 'antd/lib/select';
import { ColumnProps } from 'antd/lib/table';
import { SelectSearch } from '@';
import api from 'api';
import { checkStatus } from './RackDetail';
import './style.scss';


class RackAddTable extends Component<any, any> {
  state: any = {
    assetId: '',
    assetIdList: [], // 资产编号列表
    deviceInfo: [],
    Unum: 1,
    sendData: {
      beginU: '',
      endU: '',
    },
    sealEndU: [], // 封存操作使得结束U列表，由起始U选择后生成
    sealSendData: {
      blockReason: '',
      beginU: '',
      endU: '',

    }
  };
  selectStyle = {
    size: 'small' as AbstractSelectProps['size'],
  };

  componentDidMount() {
    this.getAssetIdList();
  }

  getAssetIdList = () => {
    api.queryAssetIdList().then(res => {
      this.setState({
        assetIdList: res.result
      })
    })
  }

  selectAssetId = (value: string) => {
    this.setState({
      assetId: value,
    }, this.getDevice);
  }

  getDevice = () => {
    const { assetId } = this.state;
    const sendData = { assetId }
    api.queryEquipmentByAssetId(sendData).then(res => {
      this.setState({
        deviceInfo: res.result.info,
        Unum: parseInt(res.result.info.find(o => o.key === 'U数').value) || 1,
      });
    })
  }

  onSubmit = () => {
    const { assetId } = this.state;
    const sendData = { assetId, ...this.state.sendData };
    api.insertEquipment(sendData).then(() => {
      this.props.onSubmit && this.props.onSubmit('添加');
    })
  }

  generateSealBeginU = (rackTrans, UNum = 1) => {
    let options = [];
    rackTrans.forEach((inner, i) => {
      if (checkStatus(inner[0].rackStatus) !== '') return;
      const end = inner.length - UNum + 1;
      if (end <= 0) return;
      inner.slice(0, end).forEach((item, j) => {
        options.push(
          <Select.Option key={i + '-' + j}>{item.rackPosition}</Select.Option>
        )
      })
    })
    return options;
  }

  selectBeginU = (value) => {
    const { rackTrans } = this.props;
    const position = value.split('-');
    const beginU = rackTrans[position[0]][position[1]].rackPosition;
    const { sendData, Unum } = this.state;
    const endU = rackTrans[position[0]][Number(position[1]) + Unum - 1].rackPosition;
    this.setState({
      sendData: {
        ...sendData,
        beginU,
        endU,
      }
    })
  }

  selectSealBeginU = (value) => {
    const { rackTrans } = this.props;
    const position = value.split('-');
    const beginU = rackTrans[position[0]][position[1]].rackPosition;
    const { sealSendData } = this.state;
    const sealEndU = rackTrans[position[0]].slice(position[1]);
    this.setState({
      sealEndU,
      sealSendData: { ...sealSendData, beginU, endU: '' }
    })
  }

  selectSealEndU = (value) => {
    const { sealSendData } = this.state;
    this.setState({
      sealSendData: { ...sealSendData, endU: value }
    })
  }

  inputBlockReason = (e) => {
    const { sealSendData } = this.state;
    this.setState({
      sealSendData: { ...sealSendData, blockReason: e.target.value }
    })
  }

  onSeal = () => {
    const { sealSendData } = this.state;
    api.blockRackPostion(sealSendData).then(() => {
      this.props.onSubmit && this.props.onSubmit('封存');
    })
  }

  render() {
    const { assetIdList, assetId, deviceInfo, sendData, sealEndU, sealSendData, Unum } = this.state;
    const { beginU, endU } = sendData;
    const { rackTrans } = this.props;

    return (
      <>
        <div className="rack-data-modal">
          <div className="rack-data-title"><b>添加</b></div>
          <Row>
            <Col span={6}>资产编号</Col>
            <Col span={18}>
              <SelectSearch
                size="small"
                options={assetIdList}
                onChange={this.selectAssetId}
              />
            </Col>
          </Row>
          {deviceInfo.map((o, i) => (
            <Row key={i}><Col span={6}>{o.key}</Col><Col span={18}>{o.value}</Col></Row>
          ))}
          {assetId &&
            <>
              <Row>
                <Col span={6}>起始U</Col>
                <Col span={18}>
                  <Select size="small" onChange={this.selectBeginU} notFoundContent={<span style={{ padding: '5px 10px' }}>暂无可用U位</span>}>
                    {this.generateSealBeginU(rackTrans, Unum)}
                  </Select>
                </Col>
              </Row>
              <Row><Col span={6}>结束U</Col><Col span={18}>{endU}</Col></Row>
              <div className="btn-row">
                <Button disabled={!(assetId && beginU)} type="primary" onClick={this.onSubmit}>保存</Button>
              </div>
            </>
          }
        </div>
        {/* 封存代码块 */}
        {!assetId &&
          <div className="rack-data-modal" style={{ marginTop: '35px' }}>
            <div className="rack-data-title"><b>封存</b></div>
            <Row>
              <Col span={6}>起始U</Col>
              <Col span={18}>
                <Select size="small" onChange={this.selectSealBeginU}>
                  {this.generateSealBeginU(rackTrans)}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6}>结束U</Col><Col span={18}>
                <Select size="small" value={sealSendData.endU} onChange={this.selectSealEndU} notFoundContent={<span style={{ padding: '5px 10px' }}>请先选择起始U</span>}>
                  {sealEndU.map(o => (
                    <Select.Option key={o.rackPosition}>{o.rackPosition}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6}>封存原因</Col>
              <Col span={18}>
                <Input size="small" onChange={this.inputBlockReason} />
              </Col>
            </Row>
            <Row>
              <div className="btn-row">
                <Button
                  disabled={!(sealSendData.blockReason && sealSendData.beginU && sealSendData.endU)}
                  type="primary"
                  onClick={this.onSeal}
                >封存</Button>
              </div>
            </Row>
          </div>
        }
      </>
    );
  }
}

export default RackAddTable;
