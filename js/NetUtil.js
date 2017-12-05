import React,{Component} from 'react';




/**
 * 网络请求的工具类
 */
export default class NetUtils extends Component{


    //构造函数，默认的props，以及state 都可以在这里初始化了
    constructor(props){
        super(props);
    }

    /**
     * 普通的get请求
     * @param {*} url 地址
     * @param {*} params  参数
     * @param {*} callback  成功后的回调
     */
    static get(url,params,callbackSuccess,callbackError){
        fetch(url,{
            method:'GET',
            body:params
        })
            .then((response) => {
                if(response.ok){//如果相应码为200
                    return response.json(); //将字符串转换为json对象
                }
            })
            .then((json) => {
                callbackSuccess(json);
            }).catch(error => {
            Console.log(url+':'+error);
                callbackError(error);
        });
    };

    /**
     * post key-value 形式 hader为'Content-Type': 'application/x-www-form-urlencoded'
     * @param {*} url
     * @param {*} params
     * @param {*} callback
     */
    static post(url,params,callbackSuccess,callbackError){
        //添加公共参数
        var newParams = this.getNewParams(params);//接口自身的规范，可以忽略

        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'//key-value形式
            },
            body:newParams
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
            })
            .then((json) => {
                callbackSuccess(json);
            }).catch(error => {
            Console.log(url+':'+error);
            callbackError(error);
        });
    };

    /**
     * post json形式  header为'Content-Type': 'application/json'
     * @param {*} url
     * @param {*} jsonObj
     * @param {*} callback
     */
    static postJson(url,jsonObj,callbackSuccess,callbackError){
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(jsonObj),//json对象转换为string
        })
            .then((response) => {
                if(response.ok){
                    return response.json();
                }
            })
            .then((json) => {
                callbackSuccess(json);
            }).catch(error => {
            Console.log(url+':'+error);
            callbackError(error);
        });
    };

    /**
     * 获取当前系统时间 yyyyMMddHHmmss
     */
    static getCurrentDate(){
        var space = "";
        var dates = new Date();
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        if(months<10){
            months = "0"+months;
        }

        var days = dates.getDate();
        if(days<10){
            days = "0"+days;
        }

        var hours = dates.getHours();
        if(hours<10){
            hours = "0"+hours;
        }

        var mins =dates.getMinutes();
        if(mins<10){
            mins = "0"+mins;
        }

        var secs = dates.getSeconds();
        if(secs<10){
            secs = "0"+secs;
        }
        var time = years+space+months+space+days+space+hours+space+mins+space+secs;
        return time;
    };

    /**
     * 设置公共参数
     * @param {*} oldParams 参数 key-value形式的字符串
     * @return 新的参数
     */
    static getNewParams(oldParams){
        var newParams = "";
        var currentDate = this.getCurrentDate();
        newParams = oldParams+"&timestamp="+currentDate;
        return newParams;
    };


    /**
     * 获取当前系统时间 yyyyMMddHH
     */
    static getCurrentDateFormat(){
        var space = "";
        var dates = new Date();
        var years = dates.getFullYear();
        var months = dates.getMonth()+1;
        if(months<10){
            months = "0"+months;
        }

        var days = dates.getDate();
        if(days<10){
            days = "0"+days;
        }
        var time = years+space+months+space+days;
        return time;
    };
}