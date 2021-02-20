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
    import * as ECharts from 'echarts/lib/echarts';
    import Wrapper from 'react-echarts-wrapper';

    const IEcharts = Wrapper(ECharts);

    // Import all charts and components
    // require('echarts/lib/chart/line');
    require('echarts/lib/chart/bar');
    // require('echarts/lib/chart/pie');
    // require('echarts/lib/chart/scatter');
    // require('echarts/lib/chart/radar');

    // require('echarts/lib/chart/map');
    // require('echarts/lib/chart/treemap');
    // require('echarts/lib/chart/graph');
    // require('echarts/lib/chart/gauge');
    // require('echarts/lib/chart/funnel');
    // require('echarts/lib/chart/parallel');
    // require('echarts/lib/chart/sankey');
    // require('echarts/lib/chart/boxplot');
    // require('echarts/lib/chart/candlestick');
    // require('echarts/lib/chart/effectScatter');
    // require('echarts/lib/chart/lines');
    // require('echarts/lib/chart/heatmap');

    // require('echarts/lib/component/graphic');
    // require('echarts/lib/component/grid');
    // require('echarts/lib/component/legend');
    // require('echarts/lib/component/tooltip');
    // require('echarts/lib/component/polar');
    // require('echarts/lib/component/geo');
    // require('echarts/lib/component/parallel');
    // require('echarts/lib/component/singleAxis');
    // require('echarts/lib/component/brush');

    // require('echarts/lib/component/title');

    // require('echarts/lib/component/dataZoom');
    // require('echarts/lib/component/visualMap');

    // require('echarts/lib/component/markPoint');
    // require('echarts/lib/component/markLine');
    // require('echarts/lib/component/markArea');

    // require('echarts/lib/component/timeline');
    // require('echarts/lib/component/toolbox');

    // require('zrender/lib/vml/vml');


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
    optsLoading:  PropTypes.object,
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
