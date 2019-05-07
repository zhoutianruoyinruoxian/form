/**
 * @desc `为了输出对象专门做的组件`
 */
import React from 'react';
import { SelectSearch } from '@';

export default function SelectXI(props) {
  const { value: propsVal, ...arg } = props;
  const { value: optionMapVal, children } = props.optionMap;
  const onChange = (changeVal, option) => {
    let val;
    if (changeVal && option) {
      if (props.mode === 'multiple') {
        val = changeVal.map((o, index) => ({
          [optionMapVal]: o,
          [children]: option[index].props.children,
        }));
      } else {
        val = {
          [optionMapVal]: changeVal,
          [children]: option.props.children,
        };
      }
    }
    props.onChange && props.onChange(val, option);
  };
  let value;
  if (propsVal) {
    if (props.mode === 'multiple') {
      value = propsVal.length > 0 ? propsVal.map(o => o[optionMapVal]) : [];
    } else {
      value = propsVal[optionMapVal];
    }
  }

  return (
    <SelectSearch
      {...arg}
      value={value}
      onChange={onChange}
    />
  );
}
