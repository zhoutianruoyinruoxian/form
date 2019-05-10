import React, { SFC } from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import './style.scss';

interface BaseProps {
  label: string;
  fieldName: string;
  fieldValue?: string | number;
  placeholder?: string;
  desc?: string;
  onChange?(value: string, fieldName: string): void;
  inputAttr?: InputProps;
}

const Base: SFC<BaseProps> = (props) => {

  const { label, fieldName, fieldValue, placeholder, desc, inputAttr } = props;

  const onChange: InputProps['onChange'] = (e) => {
    const value = e.target.value;
    props.onChange && props.onChange(value, fieldName);
  }

  return (
    <div className="base-rc">
      <label>{label}</label>
      <Input
        size="small"
        {...inputAttr}
        placeholder={placeholder}
        value={fieldValue}
        onChange={onChange}
      />
      {desc && <p className="base-rc-desc">{desc}</p>}
    </div>
  )
}

export default Base;
