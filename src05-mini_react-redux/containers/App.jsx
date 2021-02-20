import React, {Component} from "react";
import {connect} from "../lib/react-redux";

import Counter from "../components/Counter";
import {increment, decrement} from "../redux/actions";

/*
    容器组件：通过connect包装UI组件产生的组件
    connect(): 高阶函数
    connect()返回的函数是一个高阶组件：接收一个UI组件，生成一个容器组件
    容器组件的责任：向UI组件传入特定的属性
 */

function mapStateToProps(state) {
  return {
    count: state
  }
}

function mapDispatchToProps(dispatch) {

  return {
    increment: (number) => dispatch(increment(number)),
    decrement: (number) => dispatch(decrement(number))
  }
}

export default connect(
    //指定向Counter传入哪些一般属性(属性值的来源就是store中的state)
    mapStateToProps,
    //指定向Counter传入哪些函数属性
    //如果是对象，将对象中的方法包装成一个新函数，并传入UI组件
    mapDispatchToProps
)(Counter)

