/**
 * Created by Administrator on 2016/10/18.
 */
/**
 * 缓动框架
 * @param obj  元素对象
 * @param json 动画样式对象
 * @param fn   回调函数（动画执行完毕执行）
 */
function animate(obj, json, fn) {
    if (obj.timer) {
        clearInterval(obj.timer);//如果有定时器存在就清空
    }
    obj.timer = setInterval(function () {
        var flag = true;//假设所有动画已完成
        for (var k in json) {
            if (k=="opacity"){
                var leader = parseFloat(getStyle(obj, k))*100;//getStyle获得的属性有单位
                var target = json[k]*100;
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//当Step为小数时取整。正数取大，负数去小
                leader = leader + step;
                obj.style[k] = leader/100;
                if (leader != target) {
                    flag = false;//只要有一个动画未到达，假设不成立，动画继续执行

                }
            }else if (k=="zIndex"){
                obj.style.zIndex=json[k];
            }else{
                var leader = parseInt(getStyle(obj, k));//getStyle获得的属性有单位
                var target = json[k];
                var step = (target - leader) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);//当Step为小数时取整。正数取大，负数去小
                leader = leader + step;
                obj.style[k] = leader + "px";
                if (leader != target) {
                    flag = false;//只要有一个动画未到达，假设不成立，动画继续执行

                }
            }

        }
        if (flag) {
            clearInterval(obj.timer);//假设成立，动画结束
            if (fn) {//如果有函数就执行
                fn();
            }
        }
    }, 15)
}
function getStyle(obj, attr) {//获取任意元素的任意样式  返回值带单位
    return window.getComputedStyle(obj, null)[attr] || obj.currentStyle[attr];
}
function client() {
    return {
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0,
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0,
    }
}