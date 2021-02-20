# react-echarts-wrapper [![npm](https://img.shields.io/npm/v/react-echarts-wrapper.svg)](https://www.npmjs.com/package/react-echarts-wrapper) [![react](https://img.shields.io/badge/react-16.x-brightgreen.svg)](https://reactjs.org/) [![echarts](https://img.shields.io/badge/echarts-5.x-brightgreen.svg)](https://echarts.apache.org/)

> [React.js](https://reactjs.org/) component wrap for [ECharts.js](https://echarts.apache.org/)

## Feature

1. Lightweight, efficient, on-demand binding events;
2. Support for importing ECharts.js charts and components on demand;
3. Support component resize event auto update view;

## Installation

```bash
yarn add echarts react-echarts-wrapper
```

## Usage

1. Import all charts and components

    ```javascript
    import * as ECharts from 'echarts';
    import Wrapper from 'react-echarts-wrapper';

    const IEcharts = Wrapper(ECharts);

    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    const onEvents = {
      'click': function(params) {
        // the 'this' variable can get echarts instance
        console.log(params);
      }
    };

    return (
      <IEcharts option={option} onEvents={onEvents} />
    );
    ```

2. Import ECharts.js modules manually to reduce bundle size

    ```javascript
    import * as ECharts from "echarts/core";
    import { BarChart } from "echarts/charts";
    import { TitleComponent, TooltipComponent, GridComponent } from "echarts/components";
    import { CanvasRenderer } from "echarts/renderers";
    import Wrapper from 'react-echarts-wrapper';

    ECharts.use([
      TitleComponent,
      TooltipComponent,
      GridComponent,
      BarChart,
      CanvasRenderer,
    ]);
    const IEcharts = Wrapper(ECharts);

    const option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };

    return (
      <IEcharts option={option} />
    );
    ```

## propTypes

```javascript
    className:    PropTypes.string,
    style:        PropTypes.object,
    theme:        PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    group:        PropTypes.string,
    option:       PropTypes.object.isRequired,
    initOpts:     PropTypes.object,
    notMerge:     PropTypes.bool,
    lazyUpdate:   PropTypes.bool,
    loading:      PropTypes.bool,
    loadingOpts:  PropTypes.object,
    resizable:    PropTypes.bool,
    onReady:      PropTypes.func,
    onResize:     PropTypes.func,
    onEvents:     PropTypes.object
```

[Read More](http://echarts.baidu.com/option.html)

## defaultProps

```javascript
    className: 'react-echarts',
    style: { width: '100%', height: '100%' },
    notMerge: false,
    lazyUpdate: false,
    loading: false,
    resizable: false,
    onReady: (instance, echarts) => {},
    onResize: (width, height) => {},
    onEvents: {}
```

## License

MIT
