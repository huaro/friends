/**
 * Created by dell on 2016/12/13.
 */

//封装的当前时间
function getTimer() {
    var date = new Date();
    var year = date.getFullYear();//获取年

    var month = date.getMonth() + 1; //月份从0开始的

    var day = date.getDate();

    var hour = date.getHours();

    var minute = date.getMinutes();

    var second = date.getSeconds();

    if (month < 10) {
        month = "0" + month;
    }

    if (day < 10) {
        day = "0" + day;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (minute < 10) {
        minute = "0" + minute;
    }

    if (second < 10) {
        second = "0" + second;
    }

    var str = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

    return str;
}

//获取时间
setInterval(function () {
    var timer = document.getElementById("timer");
    timer.innerHTML = getTimer();
}, 1000)
