import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import formComponentList from 'src/FormEditor/FormComponents';

const { Item } = Form;

const mapStateToProps = (state) => {
  return {
    deleteFormItem: state.formEditor.deleteFormItem,
  };
};

function FormItem({ index, item, selectRc, className, form, deleteFormItem }) {
  const deleteThisItem = () => {
    deleteFormItem(index);
  }
  return (
    <Draggable
      draggableId={item.uuid}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          className="drag-item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => selectRc(item, index)}
        >
          <ItemCom
            className={className}
            item={item}
            index={index}
            form={form}
            isDragging={snapshot.isDragging}
          />
          {className &&
            <div className="item-operate">
              <a onClick={deleteThisItem}>删除</a>
            </div>
          }
        </div>
      )}
    </Draggable>
  )
}

function ItemCom({ className, item, form, index, isDragging }) {
  const { name, id, type, required } = item;
  const { getFieldDecorator } = form;
  const Component = formComponentList[type];
  let rules = [];
  if (required) {
    rules.push({ required: true, message: `${name}不能为空！` })
  }
  return (
    <Item
      className={`${className}${isDragging ? ' dragging' : ''}`}
      label={name}
    >
      {getFieldDecorator(id, { rules })(
        <Component
          item={item}
          NValue={item.value}
          disabled
        />
      )}
    </Item>
  )
}

export default connect(mapStateToProps)(FormItem);
