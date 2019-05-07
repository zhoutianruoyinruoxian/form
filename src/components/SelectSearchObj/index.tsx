/**
 * @desc `为了输出对象专门做的组件,使用时必须受控`
 * @desc `转换逻辑需要修改，做成能够100%还原options数组的对象内容，而不只是针对optionMap进行转换`
 */
import React from 'react';
import { default as SelectSearchX, SelectSearchProps, } from '../SelectSearch';
import { SelectValue, SelectProps } from 'antd/lib/select';

// class SelectSearch extends SelectSearchX<T>{ }

interface SelectSearchObjProps<T> extends SelectSearchProps<T> {
  value?: T | T[] | any
}
export default function SelectSearchObj<T extends object>(props: SelectSearchObjProps<T>) {
  const { value: propsVal, ...arg } = props;
  const { value: optionMapVal, children } = props.optionMap;
  const onChange: SelectProps['onChange'] = (changeVal, option: React.ReactElement<any, any>) => {
    let val: any;
    if (changeVal && option) {
      if (props.mode === 'multiple') {
        val = (changeVal as SelectValue[]).map((o, index) => ({
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
  let value: SelectValue;
  if (propsVal) {
    if (props.mode === 'multiple') {
      // value = propsVal.length > 0 ? propsVal.map(o => o[optionMapVal]) : [];
      //如果多选情况value为对象，则跟对象行为一致，antd会自动处理,上面注释的方法如果propsVal是个有length属性的对象，就有问题了，
      //而且propsVal作为对象存在的时候不应该否定返回空数组
      value = Array.isArray(propsVal) ? propsVal.map(o => o[optionMapVal]) : propsVal[optionMapVal];
    } else {
      // value = propsVal[optionMapVal];
      value = Array.isArray(propsVal) ? propsVal[0][optionMapVal] : propsVal[optionMapVal];
    }
  }

  return (
    <SelectSearchX
      {...arg}
      value={value}
      onChange={onChange}
    />
  );
}
