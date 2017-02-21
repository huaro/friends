/**
 * Created by Administrator on 2016/10/23.
 */
var shine = new Shine(document.getElementById('headline'));

function handleMouseMove(event) {
    shine.light.position.x = event.clientX;
    shine.light.position.y = event.clientY;
    shine.draw();
}
//var colorArr=["#fed73c","#9311e2","#7fbf5b,#ea525e"]
//headline.style.color=colorArr[0];
window.addEventListener('mousemove', handleMouseMove, false);