import React from 'react';
import Throttle from 'lodash.throttle';
import ElementResizeDetector from 'element-resize-detector';

const ResizeDetector = ElementResizeDetector({
  strategy: 'scroll', // <- For ultra performance.
});

function wrapECharts(echarts, propsAreEqual) {
  function ECharts(props) {
    const {
      className,
      style,
      theme,
      group,
      option,
      initOpts,
      notMerge,
      lazyUpdate,
      loading,
      loadingOpts,
      resizable,
      onReady,
      onResize,
      onEvents,
    } = props;

    const dom = React.useRef();
    const instance = React.useRef();

    // init
    React.useLayoutEffect(() => {
      const refDom = dom.current;
      if (!refDom) {
        return;
      }

      const newInstance = echarts.getInstanceByDom(refDom) ?? echarts.init(refDom, theme, initOpts);

      onReady(newInstance, echarts);
      instance.current = newInstance;

      return () => {
        newInstance?.clear();
        newInstance?.dispose();

        instance.current = undefined;
      };
    }, [initOpts, onReady, theme]);

    // resize
    React.useLayoutEffect(() => {
      const refDom = dom.current;
      if (!refDom || !resizable) {
        return;
      }

      const oldFnResize = opts => {
        const { width, height } = opts;
        instance.current?.resize(opts);
        onResize(width, height);
      };

      const newFnResize = Throttle(oldFnResize, 250, {
        leading: true,
        trailing: true,
      });

      const handleResize = element => {
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        newFnResize({
          width,
          height,
          silent: false,
        });
      };

      ResizeDetector?.listenTo(refDom, handleResize);

      return () => {
        ResizeDetector?.removeListener(refDom, handleResize);
        newFnResize?.cancel();
      };
    }, [onResize, resizable]);

    // events
    React.useLayoutEffect(() => {
      const refInstance = instance.current;
      if (!refInstance) {
        return;
      }

      const bindEvent = (name, func) => {
        if (typeof func !== 'function') {
          return () => {};
        }

        const fn = func.bind(refInstance);
        refInstance?.on(name, fn);
        return () => instance.current?.off(name, fn);
      };

      const unbindEvents = [];
      for (const e in onEvents) {
        if (Object.prototype.hasOwnProperty.call(onEvents, e)) {
          unbindEvents.push(bindEvent(e.toLowerCase(), onEvents[e]));
        }
      }

      return () => {
        unbindEvents.forEach(unbind => unbind());
      };
    }, [onEvents]);

    // group
    React.useLayoutEffect(() => {
      const refInstance = instance.current;
      if (!refInstance) {
        return;
      }

      refInstance.group = group;
    }, [group]);

    // loading
    React.useLayoutEffect(() => {
      const refInstance = instance.current;
      if (!refInstance) {
        return;
      }

      if (loading) {
        refInstance?.showLoading('default', loadingOpts);
      } else {
        refInstance?.hideLoading();
      }
    }, [loading, loadingOpts]);

    // update
    React.useLayoutEffect(() => {
      const refInstance = instance.current;
      if (!refInstance) {
        return;
      }

      refInstance?.setOption(option, notMerge, lazyUpdate);
    }, [lazyUpdate, notMerge, option]);

    return <div ref={dom} className={className} style={style} />;
  }

  ECharts.propTypes = {
    // className: PropTypes.string,
    // style: PropTypes.object,
    // theme: PropTypes.oneOfType([
    //   PropTypes.string,
    //   PropTypes.object
    // ]),
    // group: PropTypes.string,
    // option: PropTypes.object.isRequired,
    // initOpts: PropTypes.object,
    // notMerge: PropTypes.bool,
    // lazyUpdate: PropTypes.bool,
    // loading: PropTypes.bool,
    // loadingOpts: PropTypes.object,
    // resizable: PropTypes.bool,
    // onReady: PropTypes.func,
    // onResize: PropTypes.func,
    // onEvents: PropTypes.object
  };

  ECharts.defaultProps = {
    className: 'react-echarts',
    style: {
      width: '100%',
      height: '100%',
    },
    notMerge: false,
    lazyUpdate: false,
    loading: false,
    resizable: false,
    onReady: (instance, echarts) => {},
    onResize: (width, height) => {},
    onEvents: {},
  };

  return React.memo(ECharts, propsAreEqual);
}

export default wrapECharts;
