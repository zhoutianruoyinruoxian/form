import React from 'react';


export default function (Component) {
  return class FormItemElement extends React.Component<any, any>{
    render() {
      const { disabled, NValue, value, item, onChange } = this.props;
      const { id, type, required, readOnly, placeholder } = item;
      const args = { id, type, required, readOnly, placeholder }
      return (
        <Component
          {...args}
          value={NValue || value}
          disabled={disabled}
          onChange={onChange}
        />
      )
    }
  }

}