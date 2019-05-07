import React, { Component } from 'react';
import { Table } from 'antd';
import isEqual from 'lodash-es/isEqual';
import { TableProps, SorterResult, TableCurrentDataSource } from 'antd/lib/table';
import { PaginationConfig } from 'antd/lib/pagination';
import { SpinProps } from 'antd/lib/spin';

/**
 * T:dataSource的单个元素
 * Y:请求参数params
*/

type ResData = any;
type BeforeRequest<T> = (pagination: PaginationConfig, filters: Record<keyof T, string[]>, sorter: SorterResult<T>, extra: TableCurrentDataSource<T>) => {};

interface afterRequestData<T> {
  data: {
    total: number;
    list: T[];
    [other: string]: any;
  };
  [other: string]: any;
}

export interface TableXProps<T, Y> extends TableProps<T> {
  params?: Y;
  dataSource?: T[];
  api?(...arg: any): Promise<ResData>;
  autoRefresh?: boolean;
  beforeRequest?: BeforeRequest<T>;
  afterRequest?(res: ResData): afterRequestData<T>;
}

interface TableXState<T, Y> {
  dataList: T[],
  pagination: PaginationConfig,
  loading: boolean | SpinProps,
  params: Y,
  onTableChange: [
    PaginationConfig,
    Record<keyof T, string[]>,
    SorterResult<T>,
    TableCurrentDataSource<T>
  ],
}

export default class TableX<T = any, Y = {}> extends Component<TableXProps<T, Y>, TableXState<T, Y>> {
  Table: Table<T>;
  readonly defaultState: any;
  readonly state: TableXState<T, Y>;
  constructor(props: TableXProps<T, Y>) {
    super(props);
    let pagination = {};
    let loading = {};
    if (props.pagination) { // 如果props.pagination存在，则将初始值赋给state用于请求
      pagination = {
        current: props.pagination.current || 1,
        pageSize: props.pagination.pageSize || 10,
      }
    };
    if (typeof props.loading !== 'boolean') { // 如果props.loading存在，则将初始值赋给state用于获取配置
      loading = {
        delay: props.loading.delay || 0,
        spinning: props.loading.spinning || false,
      }
    } else {
      loading = props.loading;
    };
    this.defaultState = {
      pagination,
      onTableChange: [// beforeRequest的入参
        pagination,
        {} as Record<keyof T, string[]>,
        {} as SorterResult<T>,
        {} as TableCurrentDataSource<T>,
      ],
    },
      this.state = {
        dataList: [],
        loading,
        params: {} as Y, // 父组件传入得待合并请求参数
        ...this.defaultState
      };
  }

  static defaultProps = {
    beforeRequest: ((pagination, filters, sorter) => ({
      current: pagination.current,
      pageSize: pagination.pageSize,
      filters,
      sorter,
    })) as BeforeRequest<any>,
    autoRefresh: false,
    pagination: {}, // 防止取到undefined
    loading: {}, // 防止取到undefined
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps: TableXProps<T, Y>) {
    const checkData = this.checkData(nextProps);
    if (nextProps.autoRefresh) {
      if (checkData === 1 && !isEqual(nextProps.dataSource, this.props.dataSource)) {
        this.getData(nextProps);
      }
      if (checkData === 2 && (!isEqual(nextProps.params, this.props.params) || !isEqual(nextProps.api, this.props.api))) {
        this.reset(nextProps);
      }
    }
  }

  init() {
    const checkData = this.checkData();
    if (checkData === 1) return this.getData();
    if (checkData === 2) return this.getDataFromServer();
  }

  checkData = (props = this.props) => {
    const { dataSource, api } = props;
    if (dataSource) return 1;
    if (api) return 2;
    return 0;
  }

  getDataFromServer = (props = this.props) => {
    const { loading, onTableChange } = this.state;
    const { api, params } = props;
    const tableParams = this.props.beforeRequest(...onTableChange);
    const sendData = Object.assign({}, params, tableParams);
    this.setState({
      loading: Object.assign({}, loading, { spinning: true })
    })
    api(sendData).then((res) => {
      const response = props.afterRequest ? props.afterRequest(res) : res;
      const { list, total } = response;
      const pagination = Object.assign({}, this.state.pagination, { total });
      this.setState({
        dataList: list,
        pagination,
      });
    }).finally(() => {
      this.setState({
        loading: Object.assign({}, loading, { spinning: false }),
      })
    })
  }

  refresh = () => {
    this.checkData() === 2 && this.getDataFromServer();
  }

  reset = (props = this.props) => {//暂不支持静态数据
    if (this.checkData() !== 2) return;
    this.setState({ // 重置页码到第一页
      pagination: Object.assign({}, this.state.pagination, { current: 1 }),
      onTableChange: this.defaultState.onTableChange,
    }, () => this.getDataFromServer(props))
  }

  getData(props = this.props) {
    const { dataSource } = props;
    const pagination = Object.assign({}, this.state.pagination, { total: dataSource.length });
    this.setState({
      dataList: dataSource,
      pagination,
    })
  }

  onTableChange: TableProps<T>['onChange'] = (pagination, filters, sorter, extra) => {
    this.props.onChange && this.props.onChange(pagination, filters, sorter, extra);
    this.setState({ pagination, onTableChange: [pagination, filters, sorter, extra] }, () => {
      this.checkData() === 2 && this.getDataFromServer()
    });
  }

  render() {
    const { dataList, loading: stateLoading } = this.state;
    const { api, dataSource, loading: propsLoading, pagination: propsPagination, ...arg } = this.props;
    //将props和state的pagination合并，state优先
    const pagination = propsPagination ? Object.assign({}, propsPagination, this.state.pagination) : false;
    //将props和state的loading合并，state优先
    const loading = typeof propsLoading === 'boolean' ? (stateLoading || propsLoading) : Object.assign({}, propsLoading, stateLoading);

    return (
      <Table
        ref={ref => this.Table = ref}
        {...arg}
        loading={loading}
        onChange={this.onTableChange}
        dataSource={dataList}
        pagination={pagination}
      />
    )
  }
}

