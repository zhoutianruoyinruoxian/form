import React, { Component } from 'react';
import formConfigMap from 'src/config/formConfigMap';

export default class FormContent extends Component<any, any> {

  changeConfig = (value, name) => {
    this.props.onChange && this.props.onChange(value, name)
  }

  render() {
    const { type, data } = this.props;
    return (
      <div>
        {
          formConfigMap[type] && formConfigMap[type].map((o, i) => {
            // FCM: formConfigMap的缩写
            const FCM = o.component;
            const rcData = Object.assign({}, o.defaultOption, data)//无效的
            return (
              <FCM key={i} data={rcData} text={o.text} onChange={this.changeConfig} />
            )
          })
        }
      </div>
    )
  }
}