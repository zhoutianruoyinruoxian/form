export default {
  state: {
    deleteFormItem: undefined,
  },
  mutations: {
    setDeleteFormItem(setState, getState, fun) {
      setState({ deleteFormItem: fun });
    },
  },
};
