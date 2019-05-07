import api from 'api';

export default {
  state: {
    userInfo: {},
  },
  mutations: {
    getUserInfo(setState) {
      api.userInfo().then(res => {
        setState({ userInfo: res.result });
      });
    },
    logout(setState) {
      api.logout().then(() => {
        setState({ userInfo: {} });
      });
    },
  },
};
