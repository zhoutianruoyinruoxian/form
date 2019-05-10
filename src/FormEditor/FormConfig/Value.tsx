import React from 'react';
import { BaseInput } from './_Base';

export default function (props) {

  const { text, data, onChange } = props;
  const { value } = data;
  return (
    <BaseInput
      label={text || "默认值"}
      fieldName="value"
      fieldValue={value}
      onChange={onChange}
    />
  )
}