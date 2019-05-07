import modules from './modules';
import storeCreator from 'redux-small';


export const { store, mapMutations, reducers } = storeCreator(modules);

export default store;
