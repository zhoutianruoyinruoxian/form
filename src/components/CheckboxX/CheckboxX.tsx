/**
 * *多选框组*
 * @desc `传入参数继承自Checkbox.Group,在原来的基础上加了禁用组员的功能和全选功能，该组件为受控组件(有全选功能的缘故)，暂不支持defaultvalue属性`
 * @param {List} disabledItem 禁用的组员
 * @param {boolean|string} showAll 是否显示全选，默认为true,也可以自定义全选的名字(类型为string),如果为''或者false则不显示
 * 
 */

import React, { PureComponent } from 'react';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent, CheckboxGroupProps } from 'antd/lib/checkbox';
import isEqual from 'lodash-es/isEqual';

type List = string[];

interface ICheckboxState {
  value: List;
}

interface IcCheckboxProps extends CheckboxGroupProps {
  value?: List;
  disabledItem?: List;
  showAll: boolean | string;
}

type Istate = Readonly<ICheckboxState>;
type Iprops = Readonly<IcCheckboxProps>;

export default class CheckboxX extends PureComponent<Iprops, Istate> {
  readonly state: Istate = {
    value: [],
  };

  static defaultProps: Iprops = {
    disabledItem: [],
    showAll: true,
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps(nextProps: Iprops) {
    //nextProps和this.state作比较
    if (!isEqual(nextProps.value, this.state.value)) {
      this.init(nextProps);
    }
    //options改变则重置value，防止出错
    if (!isEqual(nextProps.options, this.props.options)) {
      this.setState({
        value: [],
      })
    }
  }

  init = (props: Iprops = this.props) => {
    const { value } = props
    this.setState({
      value,
    })
  }

  onChange = (checkedValue: string[]) => {
    this.setState({
      value: checkedValue,
    }, () => {
      this.props.onChange && this.props.onChange(checkedValue);
    })
  }

  selectAll = (e: CheckboxChangeEvent) => {
    let value = [];
    if (e.target.checked) value = this.props.options;
    this.setState({
      value,
    }, () => {
      this.props.onChange && this.props.onChange(value);
    })
  }

  render() {
    const { value } = this.state;
    const { showAll, disabled, options, disabledItem, ...arg } = this.props;
    const selectAll = value.length === options.length;
    return (
      <div className="check-box-x">
        {showAll &&
          <Checkbox
            value="all"
            disabled={disabled}
            checked={selectAll}
            indeterminate={value.length > 0 && !selectAll}
            onChange={this.selectAll}
          >{typeof showAll === 'string' ? showAll : '全选'}</Checkbox>
        }
        <Checkbox.Group
          {...arg}
          value={value}//Group内部会生成value数组通过onChange传出(options数组改变后内部value不会刷新)，所以需要传入外部的value强制控制内部的值，达到同步value的作用防止出错，
          disabled={disabled}
          onChange={this.onChange}
        >
          {options.map((name: string, index) => (
            <Checkbox
              value={name}//Group的onChange事件跟checkbox通过value进行绑定，如果不设定则Group的onChange事件获取的value为undefined(单个checkbox使用value属性是没有意义的，文档上也没显示value属性配置，但是源码里有用到)
              checked={value.includes(name)}//Checkbox存在于Group内部的时候，是否选中需要自己指定，无法通过Group的value自动选中
              key={index}
              disabled={disabledItem.includes(name)}
            >{name}</Checkbox>
          ))}
        </Checkbox.Group>
      </div>
    )
  }
}