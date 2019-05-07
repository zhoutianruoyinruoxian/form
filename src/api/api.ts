import { AxiosRequestConfig } from 'axios';

export interface ApiListItem extends AxiosRequestConfig {
  desc?: string;
}
export interface ApiList {
  [apiName: string]: ApiListItem;
}

const apiList: ApiList = {
  login: { url: '/login/openid', method: 'get', desc: '登录' },
  logout: { url: '/login/logout', method: 'get', desc: '登出' },
  userInfo: { url: '/login/userinfo', method: 'get', desc: '获取用户信息' },

  //机柜管理
  getIdcCity: { url: '/idc/getIdcCity', method: 'get', desc: '获取区域下拉列表' },
  getIdcNo: { url: '/idc/getIdcNo', method: 'get', desc: '获取机房编号下拉列表' },
  getIdc: { url: '/idc/getIdc', method: 'get', desc: '获取机房编号下拉列表' },

  getIdcInfo: { url: '/idc/getIdcInfo', method: 'get', desc: '机房基本信息详情' },
  cabinetUseCount: { url: '/idc/getCabinetUseCount', method: 'get', desc: '机柜类型统计' },


  queryRackListAndCabinetInfo: { url: '/idcCabinet/queryRackListAndCabinetInfo', method: 'get', desc: '查询机架位列表以及机柜详情' },
  queryEquipmentInfoAndDetails: { url: '/idcCabinet/queryEquipmentInfoAndDetails', method: 'get', desc: '设备详情查询' },
  queryElectricOperateLogs: { url: '/idcCabinet/queryElectricOperateLog', method: 'get', desc: '查询上下电记录' },
  //机柜上下电
  getIdcPullDownInfo: { url: '/idcCabinet/getIdcPullDownInfo', method: 'get', desc: '机柜上下电相关列表' },
  getCostCenterAndProductInfo: { url: '/call/getCostCenterAndProductInfo', method: 'get', desc: '获取成本中心与产品列表' },
  electricConfig: { url: '/idcCabinet/electricConfig', method: 'post', desc: '机柜上下电' },

  //机柜新增设备
  queryAssetIdList: { url: '/idcCabinet/queryAssetIdList', method: 'get', desc: '资产编号下拉列表' },
  insertEquipment: { url: '/idcCabinet/insertEquipment', method: 'post', desc: '设备上架到机架' },
  queryEquipmentByAssetId: { url: '/idcCabinet/queryEquipmentByAssetId', method: 'get', desc: '设备详情查询' },
  blockRackPostion: { url: '/idcCabinet/blockRackPostion', method: 'post', desc: '封存机架位' },

};

export default apiList;