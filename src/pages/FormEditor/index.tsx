import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapMutations } from 'src/redux';
import { FORMCLS } from 'src/constant/formEditor';
import clone from 'lodash-es/clone';
import FormContent from './FormContent';
import FormEditorNav from './FormEditorNav';
import FormConfig from './FormConfig';
import FormItem from './FormItem';
import formEditorNavList from 'src/config/formEditorNavList';
import NMap from 'src/constant/formEditorNameMap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './style.scss';

import data from 'src/mock/formEditorData.json';

const mapDispatchToProps = () => {
  return {
    setDeleteFormItem: mapMutations.formEditor.setDeleteFormItem,
  };
};
class App extends Component<any, any> {
  droppableId = {
    FORM: 'form',
    NAV: 'nav'
  }
  constructor(props) {
    super(props);
    const formData = data;
    this.state = {
      formData,
      selectIndex: -1, // -1为表单名称
      type: NMap.FORM,
    }
  }

  componentDidMount() {
    this.props.setDeleteFormItem(this.deleteFormItem);
  }

  selectRc = (item, selectIndex) => {
    this.setState({
      type: item.type,
      selectIndex,
    })
  }

  onDragStart = (event) => {
    console.log(event, 333)
  }

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination || destination.droppableId !== this.droppableId.FORM) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    if (source.droppableId === this.droppableId.NAV) {
      let data = clone(this.state.formData);
      const newItem = formEditorNavList[source.index].defaultOption;
      data.splice(destination.index, 0, newItem);
      this.setState({
        formData: data,
      });
    }
    if (source.droppableId === this.droppableId.FORM) {
      let data = clone(this.state.formData);
      const deleteItem = data.splice(source.index, 1);
      data.splice(destination.index, 0, deleteItem[0]);
      this.setState({
        formData: data,
      });
    }
  };

  deleteFormItem = (index) => {
    let data = clone(this.state.formData);
    data.splice(index, 1);
    this.setState({
      formData: data,
    });
  }


  changeConfig = (value, name) => {
    const obj = { [name]: value };
    const { selectIndex } = this.state;
    // if (selectIndex === -1) {

    // }
    const formData = clone(this.state.formData);
    formData[selectIndex] = Object.assign({}, formData[selectIndex], obj)
    this.setState({
      formData,
    })
  }

  render() {
    const { type, formData: dataList, selectIndex } = this.state;
    const formData = dataList.map((o, i) => Object.assign({}, o, { uuid: 'item-' + i }))
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <div className={FORMCLS}>
          <div className={`${FORMCLS}-nav`}>
            <FormEditorNav
              title="通用组件"
              formData={formData}
              droppableId={this.droppableId}
            />
          </div>
          <div className={`${FORMCLS}-content`}>
            <FormContent
              formData={formData}
              droppableId={this.droppableId}
              onSelect={this.selectRc}
              selectIndex={selectIndex}
            />
          </div>
          <div className={`${FORMCLS}-config`}>
            <FormConfig
              type={type}
              data={formData[selectIndex]}
              onChange={this.changeConfig}
            />
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default connect(undefined, mapDispatchToProps)(App);
