/**
 * @desc `为了输出对象专门做的组件`
 */
import React from 'react';
import { CheckboxX } from '@';


export default function CheckBoxGroup(props) {
  const { value: propsVal, onChange, options, optionMap, ...arg } = props;
  const { children } = optionMap;
  const optionsList = options.map(o => {
    if (!o[children]) throw new Error(`'optionMap' set error`);
    return o[children];
  });
  const onGroupChange = (list) => {
    const selectList = list.map(o => options.find(p => p[children] === o));
    onChange && onChange(selectList);
  };

  const value = (propsVal && propsVal.length > 0) ? propsVal.map(o => o[children]) : [];

  return (
    <CheckboxX
      {...arg}
      value={value}
      options={optionsList}
      onChange={onGroupChange}
    />
  );
}
