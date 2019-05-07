import React, { PureComponent, CSSProperties } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import { Echarts, Content } from '@';
import { optionBar, optionPie, optionBarStack } from './echartsOption';
import BlockTitle from './containers/BlockTitle/BlockTitle';
import Block from './containers/Block/Block';
import RackDetail from './Modal/RackDetail/RackDetail';
import api from 'api';
import './style.scss';
import cloneDeep from 'lodash-es/cloneDeep';
import isEqual from 'lodash-es/isEqual';

const mapDispatchToProps = () => {
  return {
    setDetailRefresh: mapMutations.rack.setDetailRefresh,
  };
};

class ResourceOverview extends PureComponent<any> {
  echartStyle: CSSProperties = {
    width: '30%',
    height: '300px',
    float: 'left',
    padding: '0 1.5%',
  }

  defaultCabinetTypeList = {
    cabinet_use: [],
    empty: [],
    used: []
  }

  state = {
    idcInfo: {} as any,
    cabinetTypeList: this.defaultCabinetTypeList,
    maxCol: 1,
    rackList: [],
    visible: false,
    selectCabinetNo: '',
  }

  componentDidMount() {
    this.getDetail();
    this.props.setDetailRefresh(this.getDetail);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.match, this.props.match)) {
      this.getDetail(nextProps);
    }
  }

  getDetail = (props = this.props) => {
    const params = props.match.params.id;
    const param = params.split('_');
    const sendData = {
      idcNo: param[0],
      idcRoomNo: param[1],
    }
    api.getIdcInfo(sendData).then(res => {
      const { count } = res.result;
      this.setState({
        idcInfo: res.result.idcInfo,
        rackList: res.result.rows,
        maxCol: count,
      })
    })
    api.cabinetUseCount(sendData).then(res => {
      let cabinetTypeList = cloneDeep(this.defaultCabinetTypeList);
      res.result.forEach(o => {
        cabinetTypeList.cabinet_use.push(o.cabinet_use);
        cabinetTypeList.empty.push(o.empty);
        cabinetTypeList.used.push(o.used);
      })
      this.setState({
        cabinetTypeList,
      })
    })
  }

  selectRack = (item: any) => {
    this.setState({
      visible: true,
      selectCabinetNo: item.cabinetNo,
    })
  }

  modalCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const { idcInfo, rackList, visible, selectCabinetNo, cabinetTypeList, maxCol } = this.state;
    const { match } = this.props;

    return (
      <Content className="rack-management" breadCrumb={['机架管理', match.params.id]}>
        <div className="rack-title clearfix">
          <BlockTitle title="机房名称">
            <h1>{idcInfo.idcName}</h1>
          </BlockTitle>
          <BlockTitle title="机房编号">
            <h1>{idcInfo.idcNo}</h1>
          </BlockTitle>
          <BlockTitle title="机房模块">
            <h1>{idcInfo.idcRoomNo}</h1>
          </BlockTitle>
          <BlockTitle title="机架可用数">
            <h1>{idcInfo.usableCabinetNum}</h1>
          </BlockTitle>
          <BlockTitle title="电力情况">
            <h1>{idcInfo.powerSituation}</h1>
          </BlockTitle>
          <BlockTitle title="制冷方式">
            <h1>{idcInfo.coolingMode}</h1>
          </BlockTitle>
          <BlockTitle title="联系人">
            {idcInfo.idcLeader && idcInfo.idcLeader.map((o, i) =>
              (<h1 key={i} className="contact">{o.name} {o.email}</h1>)
            )}
          </BlockTitle>
        </div>
        <div className="rack-charts clearfix">
          {/* <Echarts
            style={this.echartStyle}
            option={optionBar}
          />
          <Echarts
            style={this.echartStyle}
            option={optionPie}
          /> */}
          <Echarts
            style={this.echartStyle}
            option={optionBarStack(cabinetTypeList)}
          />
        </div>
        <ul className="rack-color-tip clearfix">
          <li>未加电</li>
          <li className="active">已加电有剩余U数</li>
          <li className="full">已加电无剩余U数</li>
        </ul>
        <div className="rack-list">
          {rackList.map((RackRow, rowkey) => (
            <ul className="rack-row" key={rowkey}>
              {RackRow.map((item, i) => (
                <li key={i}
                // style={{ width: (24 / maxCol) + '%' }}
                >
                  {item && <Block data={item} onClick={this.selectRack} />}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <RackDetail
          cabinetNo={selectCabinetNo}
          visible={visible}
          onClose={this.modalCancel}
        />
      </Content>
    )
  }
}

export default connect(undefined, mapDispatchToProps)(ResourceOverview)