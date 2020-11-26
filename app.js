const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";


canvas.width =700;
canvas.height = 700;

ctx.fillStyle ="white"
ctx.fillRect(0,0,700,700);

;ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x,y);

    if(!painting){
        // path는 선 시작점은 
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        // 현재있는 라인까지 선을 긋는 Line moveto~ 좌표부터 
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,700,700);
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("img/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
}

function handlePrevent(event){
    event.preventDefault();
}

if(canvas) {
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handlePrevent);
}

Array.from(colors).forEach(color => color.addEventListener("click",handleColorClick))

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click",handleModeClick)
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}