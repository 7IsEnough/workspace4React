/*
    reducer函数模块：根据当前state和指定的action返回一个新的state
 */

import {INCREMENT, DECREMENT} from "./action-types"
import {combineReducers2} from "../lib/redux";

//管理count状态数据的reducer
function count(state = 2, action) {
  console.log("count()", state, action);
    switch (action.type) {
      case INCREMENT:
        return state + action.data;
      case DECREMENT:
        return state - action.data;
      default:
        return state;
    }
    return
}

/*
    管理用户信息的reducer函数
 */
function user(state={}, action) {
  console.log("user()", state, action);
    switch (action.type) {
      default:
        return state
    }
}

/*
    返回一个整合后总的reducer
    总的状态：{count:1, user: {} }
 */
export default combineReducers2({
  count,
  user
})