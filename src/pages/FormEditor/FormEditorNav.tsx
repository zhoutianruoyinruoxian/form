import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import formEditorNavList from 'src/config/formEditorNavList';
import { FORMCLS } from 'src/constant/formEditor';

export default function FormEditorNav({ formData, droppableId }) {
  const navList = formEditorNavList.map((o, i) => Object.assign({}, o, { uuid: 'nav-' + i }));

  return (
    <Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <ul
          ref={provided.innerRef}
          className={`${FORMCLS}-nav-list clearfix`}
        >
          {navList.map((item, index) => (
            <li
              key={item.uuid}
            >
              <span>{item.title}</span>
              <Draggable
                draggableId={item.uuid}
                index={index}>
                {(provided, snapshot) => (
                  <span
                    className={`drag-item${snapshot.isDragging ? ' dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.title}
                  </span>
                )}
              </Draggable>
            </li>
          ))}
        </ul>
      )}
    </Droppable>
  )
}
