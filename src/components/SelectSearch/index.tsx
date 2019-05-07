/**
 * @desc 该组件用于支持搜索的，数据量较大的单选框
*/

import React, { PureComponent } from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import isEqual from 'lodash-es/isEqual';

const { Option } = Select;

interface SelectSearchState<T> {
  options: T[];
}

interface OptionMap {
  children: string | number;
  value: string | number;
  key?: string | number;
}

export interface SelectSearchProps<T> extends SelectProps {
  max?: number;
  options?: T[];
  optionMap?: OptionMap
}

export default class SelectSearch<T = any> extends PureComponent<SelectSearchProps<T>, SelectSearchState<T>> {
  select: Select;
  readonly state: SelectSearchState<T>;
  constructor(props: SelectSearchProps<T>) {
    super(props);
    this.state = {
      options: [],
    }
  }

  static defaultProps = {
    showSearch: true,
    max: 50,
    optionFilterProp: 'children',
    options: [],
    optionMap: {
      children: 'name',
      value: 'value',
      key: 'value',
    },
  }

  componentDidMount() {
    this.cut();
  }

  componentWillReceiveProps(nextProps: SelectSearchProps<T>) {
    if (!isEqual(nextProps, this.props)) {
      this.cut(nextProps);
    }
  }

  cut = (props: SelectSearchProps<T> = this.props) => {
    const { max, options: list } = props;
    const options = list.slice(0, max);
    this.setState({
      options,
    })

  }

  onChange: SelectProps['onChange'] = (value, option) => {
    if (value === undefined) this.cut();
    this.props.onChange && this.props.onChange(value, option);
  }

  onSearch = (value: string) => {
    const { options: list, optionMap, max } = this.props;
    const { children } = optionMap;
    let options = [];
    if (value !== '') {
      options = list.filter(o => ~o[children].indexOf(value)).slice(0, max);
    } else {
      options = list.slice(0, max);
    }
    this.setState({
      options,
    }, () => {
      this.props.onSearch && this.props.onSearch(value);
    })
  }

  onBlur: SelectProps['onBlur'] = (value) => {
    this.cut();
    this.props.onBlur && this.props.onBlur(value);
  }

  render() {
    const { options } = this.state;
    const { className, optionMap, ...arg } = this.props;
    return (
      <Select
        className={`select-search ${className || ''}`}
        ref={ref => this.select = ref}
        {...arg}
        onSearch={this.onSearch}
        onChange={this.onChange}
        onBlur={this.onBlur}
      >
        {options.map((item) => {
          if (typeof item === 'object') {
            const { children, value, key = value } = optionMap;
            if (item[key] == undefined) throw new Error(`'optionMap' set error`);
            return (<Option value={item[value]} key={item[key]}>{item[children]}</Option>)
          }
          if (typeof item === 'string' || typeof item === 'number') {
            return (<Option value={item} key={item}>{item}</Option>)
          }
          throw new Error(`The children of 'options' must be string or number or object!`);
        })
        }
      </Select >
    )
  }
}
