export const PRODUCTION = process.env.NODE_ENV === 'production';
const port = PRODUCTION ? '' : ':8082';
export const NIOPSURL = 'http://billing.niops-test.netease.com' + port;
export const NIOPSURLHELP = 'http://billing.niops.netease.com/api/v1/download_help/';
