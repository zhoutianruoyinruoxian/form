/**
* `表单组件=>配置项map表`
*/


import * as FConfig from 'src/FormEditor/FormConfig';
import NMap from 'src/constant/formEditorNameMap';

export { default as Key } from '../FormEditor/FormConfig/Key';
export { default as Label } from '../FormEditor/FormConfig/Label';
export { default as Value } from '../FormEditor/FormConfig/Value';

interface FRCType {
  [props: string]: any[];
}
const FRC: FRCType = {
  [NMap.FORM]: [
    {
      component: FConfig.Label,
      text: '表单名称',
      defaultOption: {
        value: '333',
      }
    },
  ],
  [NMap.TEXT]: [
    {
      component: FConfig.Key,
      defaultOption: {
        value: '333',
      }
    },
    {
      component: FConfig.Label,
      defaultOption: {
        value: '333',
      }
    },
    {
      component: FConfig.Value,
      defaultOption: {
        value: 'value',
      }
    },
  ],
  [NMap.PASSWORD]: [
    {
      component: FConfig.Key,
      defaultOption: {
        value: '333',
      }
    },
    {
      component: FConfig.Label,
      defaultOption: {
        value: '333',
      }
    },
  ],
  [NMap.MUlTILINETEXT]: [
    {
      component: FConfig.Key,
      defaultOption: {
        value: '333',
      }
    },
    {
      component: FConfig.Label,
      defaultOption: {
        value: '333',
      }
    },
  ],
}

export default FRC;
