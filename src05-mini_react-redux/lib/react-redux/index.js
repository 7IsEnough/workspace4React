/*
    react-redux库的主模块
1). react-redux向外暴露了2个API
    a. Provider组件类
    b. connect函数

2). Provider组件
    接收store属性
    通过context将store暴露给所有的容器子组件
    Provider原样渲染其所有标签子节点

3). connect函数
    接收2个参数: mapStateToProps和mapDispatchToProps
    connect()执行的返回值为一个高阶组件: 包装UI组件, 返回一个新的容器组件
    mapStateToProps:
        为一个函数, 返回包含n个一般属性对象,
        容器组件中调用得到对象后, 初始化为容器组件的初始状态, 并指定为UI组件标签的一般属性
    mapDispatchToProps:
        如果为函数, 调用得到包含n个dispatch方法的对象
        如果为对象, 遍历封装成包含n个dispatch方法的对象
        将包含n个dispatch方法的对象分别作为函数属性传入UI组件
    通过store绑定state变化的监听, 在回调函数中根据store中最新的state数据更新容器组件状态, 从而更新UI组件
 */

import React from "react";
import PropTypes from "prop-types";

/*
    用来向所有的容器组件提供store的组件类
    通过context向所有的容器组件提供store
 */
export class Provider extends React.Component{

  static propTypes = {
    store: PropTypes.object.isRequired //声明接收store
  }

  // 声明提供的context的数据名称和类型
  static childContextTypes = {
    store: PropTypes.object
  }

  /*
      向所有有声明子组件提供包含要传递数据的context对象
   */
  getChildContext () {
    return {
      store: this.props.store
    }
  }

  render() {
    return (
        // 返回渲染<Provider>的所有子节点
        this.props.children
  );
  }
}

/*
    connect高阶函数：接收mapStateToProps和mapDispatchToProps两个参数
    返回一个高阶组件函数
    高阶组件：接收一个UI组件，返回一个容器组件
 */
export function connect(mapStateToProps, mapDispatchToProps) {
  // 返回高阶组件函数
  return (UIComponent) => {
    // 返回容器组件
    return class ContainerComponent extends React.Component {

      //声明接收的context数据的名称和类型
      static contextTypes = {
        store: PropTypes.object
      }

      constructor(props, context) {
        super(props, context);
        console.log("ContainerComponent constructor()", context.store);

        //得到store
        const {store} = context;
        // 得到包含所有一般属性的对象
        const stateProps = mapStateToProps(store.getState()); //{count:1}

        // 将所有一般属性作为容器的状态数据
        this.state = {...stateProps};

        //得到包含所有函数属性的对象
        let dispatchProps
        if(typeof mapDispatchToProps === "function"){
          dispatchProps = mapDispatchToProps(store.dispatch);
        }else {
          dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            const actionCreator = mapDispatchToProps[key];
            pre[key] = (...args) => {
              store.dispatch(actionCreator(...args)) // 参数透传
            }
            return pre;
          },{});
        }

        // 保存到组件上
        this.dispatchProps = dispatchProps;

        //绑定store的state变化的监听
        store.subscribe(() => { // store内部的状态数据发生了变化
          //更新容器组件 ==> UI组件更新
          this.setState({...mapStateToProps(store.getState())})
        });
      }

      render() {
        return (
            // 返回UI组件的标签
           <UIComponent {...this.state} {...this.dispatchProps}/>
      );
      }
    }
  }
}