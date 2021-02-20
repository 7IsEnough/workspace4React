import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Modal} from "antd";
import {connect} from "react-redux"

import "./index.less";
import {formateDate} from "../../utils/dateUtils";
import {reqWeather} from "../../api";
import menuList from "../../config/menuConfig";
import LinkButton from "../link-button/index";
import {logout} from "../../redux/actions"

/*
    头部
 */
class Header extends Component{

  state = {
    currentTime: formateDate(Date.now()),  //当前时间字符串
    dayPictureUrl: "",  //天气图片URL
    weather: ""  //天气的文本
  }

  getTime = () => {
    //每隔1s获取当前时间，并更新状态数据currentTime
    this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now());
      this.setState({currentTime: currentTime});
    }, 1000);
  }

  getWeather = async () => {
    //调用接口请求异步获取数据
    const {dayPictureUrl, weather} = await reqWeather("深圳");
    //更新状态
    this.setState({weather: weather, dayPictureUrl: dayPictureUrl});
  }

  getTitle = () => {
    // 得到当前请求路径
    const path = this.props.location.pathname;
    let title;
    menuList.forEach(item => {
      if(item.key === path){
        title = item.title; // 如果当前item对象的key和path一样，item的title就是需要显示的title
      } else if(item.children) {
        //在所有子Item中查找匹配的
        const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0);
        //如果有值才说明有匹配的
        if(cItem){
          //取出它的title
          title = cItem.title;
        }
      }
    })
    return title;
  }

  /*
    退出登录
   */
  logout = () => {
    //显示确认框
    Modal.confirm({
      content: "确定退出吗",
      onOk: () => {
        // console.log("OK");
          this.props.logout()

      }
    })
  }

  /*
      第一次render()之后执行一次
      一般在此执行异步操作：发ajax请求/启动定时器
   */
  componentDidMount() {
    //获取当前的时间
    this.getTime();
    //获取当前天气显示
    this.getWeather();
  }

  /*
  不能这么做：不会更新显示
  componentWillMount() {
    this.title = this.getTitle();
  }
  */

  /*
     当前组件卸载之前调用
   */
  componentWillUnmount() {
    // 清除定时器
    clearInterval(this.intervalId);
  }

  render() {
        const {currentTime, dayPictureUrl, weather} = this.state;
        const username = this.props.user.username;
        // 得到当前需要显示的title
        // const title = this.getTitle();
        const title = this.props.headTitle;


        return (
            <div className = "header">
                <div className= "header-top">
                    <span>欢迎, {username}</span>
                  <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className= "header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    state => ({headTitle: state.headTitle, user: state.user}),
    {logout}
)(withRouter(Header))