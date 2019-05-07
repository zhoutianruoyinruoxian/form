const color1 = [
  '#389ffd',
  '#6ad189',

]
const color2 = [
  '#389ffd',
  '#34c9c9',
  '#6ad189',
  '#f9d235',
  '#f06179',

]
const baseOption = {
  grid: {
    containLabel: true,
  },
  legend: {
    left: 'center',
    bottom: 10,
  }
};

export const optionBar = {
  color: color1,
  ...baseOption,
  title: {
    text: '机架电力与U位使用情况统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: [
    {
      type: 'category',
      data: ['严选', '行研', '考拉', '金融'],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
    }
  ],
  series: [
    {
      name: '已使用U位',
      type: 'bar',
      data: [1, 2, 3, 4]
    },
    {
      name: '已使用电力(kw)',
      type: 'bar',
      data: [10, 20, 10, 16]
    }
  ]
}

export const optionPie = {
  color: color2,
  ...baseOption,
  title: {
    text: '机柜SKU统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
  },
  series: {
    name: '访问来源',
    type: 'pie',
    radius: '40%',
    data: [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }

};

export const optionBarStack = (data: any) => ({
  color: color1,
  ...baseOption,
  title: {
    text: '机柜类型统计',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: [
    {
      type: 'category',
      data: data.cabinet_use,
    }
  ],
  yAxis: [
    {
      type: 'value',
    }
  ],
  series: [
    {
      name: '使用中',
      type: 'bar',
      stack: 'a',
      data: data.used,
    },
    {
      name: '空闲',
      type: 'bar',
      stack: 'a',
      data: data.empty
    }
  ]
})
