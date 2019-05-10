import React from 'react';
import { BaseInput } from './_Base';

export default function (props) {

  const { text, data, onChange } = props;
  const { name } = data;
  return (
    <BaseInput
      label={text || "字段名称"}
      placeholder={`请输入${text || '字段名称'}`}
      fieldName="name"
      fieldValue={name}
      onChange={onChange}
    />
  )
}