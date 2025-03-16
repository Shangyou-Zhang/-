//点击请假信息
$id('qjxx').onclick = ()=>{
    window.open("index.html","_self")
}
//点击核验二维码
$id('hyewm').onclick = ()=>{
    window.open("./twodcode.html","_self")
}

//将滚动代码添加到页面
let str = ""
for(let i=0;i<=100;i++){
    str += '<img class="pxsbx" src="./img/平行四边形.png"/>'
}
$id('first').innerHTML = str
$id("last-text").innerHTML = str

//滚动--------------------------------
const outer = document.getElementById('scroll-outer')
const innter = document.getElementById('scroll-inner')
const outerWidth = outer.getBoundingClientRect().width
const innerWidth = innter.getBoundingClientRect().width
const lastText = document.getElementById('last-text')
const padding = 20
const middle = innerWidth / 2
let translate = 0
if (middle - padding > outerWidth) {
    setInterval(() => {
    translate = translate >= middle ? 2 : (translate + 2)
    innter.style.transform = `translate3d(${-translate}px, 0, 0)`
    }, 100)
} else {
    lastText.style.display = 'none'
}
//滚动--------------------------------

setInterval("myDateFunc()",1000)
let tempstr = "当前时间:2022-10-01 23:13:06"//获取时间，在二维码页面使用
function myDateFunc(){
    //设置当前时间
    let date = new Date()
    let year = date.getFullYear()
    let month = zero(date.getMonth() + 1)
    let day = zero(date.getDate())
    let hour = zero(date.getHours())
    let minute = zero(date.getMinutes())
    let second = zero(date.getSeconds())
    let datestr = `当前时间:${year}-${month}-${day} ${hour}:${minute}:${second}`
    tempstr = datestr
    // 检查元素是否存在再更新
    const fourElement = document.getElementById("four");
    if(fourElement) {
        fourElement.innerHTML = datestr;
    }
    // 更新二维码页面上的时间元素
    const dqsjElement = document.getElementById("dqsj");
    if(dqsjElement) {
        dqsjElement.innerHTML = datestr;
    }
}

//将不足两位的数字前补零
function zero(num){
    if((num + "").length <= 1){
        return "0" + num
    }
    return num
}
//通过id获取对象
function $id(id){
    return document.getElementById(id)
}

// 个人信息显示功能已移除
