import React, { Component, ReactText } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ModalX } from '@';
import { Table, Button, Modal } from 'antd';
import DeviceTable from './DeviceTable';
import RackTable from './RackTable';
import RackAddTable from './RackAddTable';
import api from 'api';
import PowerOn from '../PowerOn/PowerOn';
import clone from 'lodash-es/clone';
import './style.scss';

const mapStateToProps = (state, router) => {
  return {
    detailRefresh: state.rack.detailRefresh,
  };
};

interface RackListItem {
  rackPosition: string;
  assetId: string;
  [other: string]: any;
}

export const checkStatus = (status: string) => {
  let state: string;
  switch (status) {
    case '使用中':
      state = 'active';
      break;
    case '封存':
      state = 'disable';
      break;
    default:
      state = '';
  }
  return state;
}

class RackDetail extends Component<any, any>{
  PowerOnModal: any;
  initialState = {
    tableType: undefined,//右侧显示内容的判断条件，如果是查看详情则为查询详情的参数
    rackData: {
      rackList: [],
      cabinetInfo: {},
    },
    liSelected: undefined, // 选中的机架位位置
    rackTrans: [],//经过转换的rackList列表
  }

  state: any = {
    ...this.initialState,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.init();
      this.getRackInfo(nextProps);
    }
  }

  init = () => {
    this.setState(this.initialState)

  }

  getRackInfo = (props = this.props) => {
    const cabinetNo = props.cabinetNo;
    api.queryRackListAndCabinetInfo({ cabinetNo }).then(res => {
      this.setState({
        rackData: res.result,
      }, this.transformRackList)
    })
  }

  refresh = () => {
    this.getRackInfo();
    this.props.detailRefresh();
  }


  transformRackList = () => {
    const rackList = clone(this.state.rackData.rackList);
    let rackTrans = []
    // reverse的目的是为了封存的时候生成起始U（在后面的逻辑处理中更加方便），在getList函数中最后又reverse一遍，为了跟机架位物理位置统一
    rackList.reverse().forEach((item, index) => {
      if (index > 0 && item.rackStatus === rackList[index - 1].rackStatus && item.assetId === rackList[index - 1].assetId) {
        rackTrans[rackTrans.length - 1].push(item);
      } else {
        rackTrans.push([item])
      }
    })
    this.setState({
      rackTrans,
    })
  }

  selectRack = (e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
    const { rackTrans } = this.state;
    const position = (e.target as Element).getAttribute('data-index').split('-');
    const item = rackTrans[position[0]][position[1]];
    const state = checkStatus(item.rackStatus);
    if (state === 'active') {
      this.checkDetail(item)
    } else if (state === 'disable') {
      this.setState({
        tableType: undefined,
      })
    } else {
      this.add();
    }
    this.setState({
      liSelected: position,
    })
  }

  checkDetail = (item: RackListItem) => {
    const tableType = {
      secondType: item.secondType,
      assetId: item.assetId,
    }
    this.setState({ tableType });
  }

  add = () => {
    this.setState({
      tableType: 'add',
    })
  }

  powerOn = () => {
    this.PowerOnModal.open();
  }

  powerOnSubmit = () => {
    this.PowerOnModal.close();
    this.refresh();
    Modal.success({
      className: 'modal-alert',
      content: '上电成功',
      mask: false,
    })
  }

  powerOff = () => {
    const sendData = { cabinetNo: this.state.rackData.cabinetInfo.cabinetNo, electricOnOff: '关电' }
    api.electricConfig(sendData).then(res => {
      this.refresh();
      Modal.success({
        className: 'modal-alert',
        content: '下电成功',
        mask: false,
      })
    })
  }

  rackAddSubmit = (text) => {
    this.refresh();
    Modal.success({
      className: 'modal-alert',
      content: text + '成功',
      mask: false,
    })
  }

  getList = () => {
    const { rackTrans, liSelected } = this.state;
    let span = [];
    let height = 20;
    rackTrans.forEach((inner, i) => {
      inner.forEach((item, j) => {
        let style = {};
        const state = checkStatus(item.rackStatus);
        let selected = '';
        if (state === 'active') {
          if (j !== 0) return;
          const liHeight = inner.length * height + 'px';
          style = {
            height: liHeight,
            lineHeight: liHeight,
          };
          selected = liSelected && liSelected[0] == i && liSelected[1] == j ? 'selected' : '';
        }
        span.push(
          <li
            style={style}
            key={i + '-' + j}
            data-index={i + '-' + j}
            className={`position ${state} ${selected}`}
          >
            {item.assetId}
          </li>
        )
      })
    })
    return span.reverse();
  }


  render() {
    const { visible } = this.props;
    const { tableType, rackData, rackTrans } = this.state;


    return (
      <Modal
        width="1000px"
        title="机柜详情"
        visible={visible}
        destroyOnClose
        footer={
          <div className="rack-footer">
            {rackData.status ?
              (<Button type="primary" onClick={this.powerOff}>下电</Button>) :
              (<Button type="primary" onClick={this.powerOn}>上电</Button>)
            }
            < Button onClick={this.props.onClose}>关闭</Button>
          </div>
        }
        onCancel={this.props.onClose}
      >
        <div className="rack-detail">
          <div className="info">
            <h3>机柜SKU: {rackData.sku}</h3>
            <p>KwAvali: {rackData.KwAvali}; U: {rackData.U}</p>
          </div>
          <div className="rack-content clearfix">
            <section className='rack-section'>
              <ul className="rack-color-tip clearfix">
                <li>封存</li>
                <li className="active">可用U位</li>
              </ul>
              <ul className="rack-list">
                {rackData.rackList.map((item, i) => (<li key={item.assetId + i}><label>{item.rackPosition}</label></li>))}
              </ul>
              <ul className="rack-list" onClick={this.selectRack}>
                {this.getList()}
              </ul>
            </section>
            {!tableType && <RackTable electricStatus={rackData.status} data={rackData.cabinetInfo} />}
            {tableType === 'add' && <RackAddTable rackList={rackData.rackList} rackTrans={rackTrans} onSubmit={this.rackAddSubmit} />}
            {typeof tableType === 'object' && <DeviceTable params={tableType} />}
          </div>
        </div>
        <ModalX
          width="700px"
          title="机柜上电"
          ref={ref => this.PowerOnModal = ref}
          centered
          destroyOnClose
          mask={false}
          footer={null}
        >
          <PowerOn data={rackData.cabinetInfo} onSubmit={this.powerOnSubmit} />
        </ModalX>
      </Modal>
    )
  }
}

export default connect(mapStateToProps)(withRouter(RackDetail));
