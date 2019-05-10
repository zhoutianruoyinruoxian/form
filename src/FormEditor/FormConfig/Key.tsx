import React from 'react';
import { BaseInput } from './_Base';

export default function (props) {
  const { data, onChange } = props;
  const { id } = data;
  return (
    <BaseInput
      label="字段key"
      placeholder="请输入key"
      fieldName="id"
      fieldValue={id}
      onChange={onChange}
      inputAttr={{
        maxLength: 50,
      }}
      desc="长度不能超过50个字符"
    />
  )
}