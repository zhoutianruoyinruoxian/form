import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import formEditorNavList from 'src/config/formEditorNavList';
import { FORMCLS } from 'src/constant/formEditor';

export default function FormEditorNav({ title, formData, droppableId }) {
  const navList = formEditorNavList.map((o, i) => Object.assign({}, o, { uuid: 'nav-' + i }));

  return (
    <div className={`${FORMCLS}-nav-section`}>
      <h2>{title}</h2>
      <div className={`${FORMCLS}-nav-component clearfix`}>
        <ul className={`${FORMCLS}-nav-list clearfix`}>
          {navList.map((item, index) => (
            <li key={item.uuid} >
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
        <Droppable droppableId={droppableId.NAV}>
          {(provided, snapshot) => (
            <ul
              ref={provided.innerRef}
              className={`${FORMCLS}-nav-list absolute clearfix`}
            >
              {navList.map((item, index) => (
                <Draggable
                  draggableId={item.uuid}
                  index={index}>
                  {(provided, snapshot) => {
                    const { isDragging, isDropAnimating, draggingOver } = snapshot;
                    // 如果拖拽没有拖到form表单里，则直接让拖出来的组件隐藏回到起点，通过invalid样式控制
                    const invalid = isDropAnimating && draggingOver !== droppableId.FORM;
                    return (
                      <li
                        key={item.uuid}
                      >
                        <span
                          className={`drag-item${isDragging ? ' dragging' : ''}${invalid ? ' invalid' : ''}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {item.title}
                        </span>
                      </li>
                    )
                  }}
                </Draggable>
              ))}
              {/* 拖拽之后产生的空缺由provided.placeholder来弥补 */}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  )
}
