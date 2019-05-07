import { TableX, ModalX } from '@';

const paginationConfig = {
  current: 1,
  pageSize: 10,
  hideOnSinglePage: true,
  showQuickJumper: false,
  showSizeChanger: false,
  pageSizeOptions: ['10', '20', '30', '40'],
};

TableX.defaultProps.pagination = paginationConfig;
TableX.defaultProps.beforeRequest = (pagination, filters, sorter, extra) => {
  return {
    page: pagination.current,
    pageSize: pagination.pageSize,
  };
};
TableX.defaultProps.afterRequest = (res) => {
  return res.result;
};

ModalX.defaultProps.width = 1000;
