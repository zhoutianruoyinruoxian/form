export default {
  state: {
    detailRefresh: undefined,
  },
  mutations: {
    setDetailRefresh(setState, getState, fun) {
      setState({ detailRefresh: fun });
    },
  },
};
