/**
 * `echarts插件的react组件实现`
 */
import React, { Component } from 'react';
import echarts, { ECharts } from 'echarts';
import BasePropsType from 'src/config/BasePropsType';
import './style.scss';
import isEqual from 'lodash-es/isEqual';

interface EchartsProps extends BasePropsType {
  option?: any;
  notMerge?: boolean;
  showInitialOption?: boolean;
}
interface EchartsState { }

class Echarts extends Component<EchartsProps, EchartsState> {
  thisTime: string = new Date().getTime().toString() + ~~(Math.random() * 100).toString();
  myChart: ECharts;
  timeout: NodeJS.Timeout;

  static defaultProps: EchartsProps = {
    notMerge: true,
    /**
     * @param showInitialOption 是否展示初始值(第一个props.option)，默认值:false
     * @desc 初始化的时候是否设置第一个option，一般情况下option数据由后端返回，此时初始值是空，
     * 如果DidMount生命周期里面调用setoption，会导致后面option更新后图表抖动，因为echarts会根据option自动的改变一些设置（比如y轴的value），
     * 如果是静态数据，或者需要展示option初始值的时候，开启showInitialOption，会在DidMount生命周期里面调用setoption，渲染初始option。
     */
    showInitialOption: false,
  }

  componentDidMount() {
    const dom = document.getElementById(`echarts${this.thisTime}`);
    const myChart = echarts.init(dom as HTMLDivElement);
    this.myChart = myChart;
    this.props.showInitialOption && this.myChart.setOption(this.props.option);
    window.addEventListener('resize', this.setOption);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setOption)
    this.myChart.dispose();
  }

  componentDidUpdate(prevProps: EchartsProps) {
    if (!isEqual(prevProps, this.props)) {
      const { notMerge, option } = this.props;
      this.myChart.setOption(option, notMerge);
    }
  }

  setOption = () => {
    this.timeout && clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.myChart.resize(), 300);
  };

  render() {
    const { className, option, notMerge, showInitialOption, ...args } = this.props;
    return (
      <div id={`echarts${this.thisTime}`} className={`echarts ${className || ''}`} {...args}></div>
    );
  }
}

export default Echarts;
