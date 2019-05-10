/**
* `组件名称=>组件 map表`
*/


import NMap from 'src/constant/formEditorNameMap';

import Text from './Text';
import Password from './Password';
import MultiLineText from './MultiLineText';

const formComponentList = {
  [NMap.TEXT]: Text,
  [NMap.PASSWORD]: Password,
  [NMap.MUlTILINETEXT]: MultiLineText,
}

export default formComponentList;