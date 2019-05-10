import React, { Component } from 'react';
import { Form } from 'antd';
import { Droppable } from 'react-beautiful-dnd';
import { FORMCLS } from 'src/constant/formEditor';
import NMap from 'src/constant/formEditorNameMap';
import FormItem from './FormItem';
import isEqual from 'lodash-es/isEqual';


class FormContent extends Component<any, any> {
  state = {
    hoverIndex: -2,
  }

  // componentDidMount() {
  //   this.setFormData();
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (!isEqual(nextProps.formData, this.props.formData)) {
  //     this.setFormData(nextProps)
  //   }
  // }

  // setFormData = (props = this.props) => {
  //   const { formData } = props;
  //   const { setFieldsValue } = props.form;
  //   let obj = {}
  //   formData.forEach(item => {
  //     obj[item.id] = item.value;
  //   })
  //   setFieldsValue(obj)
  // }

  getDataObj() {
    const { formData } = this.props;
    let dataObj = {};
    formData.forEach(o => {
      dataObj[o.id] = o.value;
    })
    return dataObj;
  }
  selectRc = (item, i) => {
    this.props.onSelect && this.props.onSelect(item, i);
    console.log(item, i, 333)
  }

  onFormChange = (value, key) => {
    console.log(value, 'fchange');
    this.setState({

    })
  }

  render() {
    const { formData, droppableId, selectIndex, form } = this.props;
    return (
      <div className={`${FORMCLS}-drop-target`} >
        <h2 onClick={() => this.selectRc({ type: NMap.FORM }, -1)}>表单名称</h2>
        <Form
          className={`${FORMCLS}-rclist`}
        >
          <Droppable droppableId={droppableId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                className={`form-drop-area${snapshot.isDraggingOver ? ' dragging-over' : ''}`}
              >
                {formData && formData.map((o, i) => {
                  return (
                    <FormItem
                      className={selectIndex === i ? 'selected' : ''}
                      key={o.uuid}
                      index={i}
                      item={o}
                      selectRc={this.selectRc}
                      form={form}
                    />
                  )
                })}
              </div>
            )}
          </Droppable>
        </Form>
      </div>
    )
  }
}

export default Form.create({})(FormContent);