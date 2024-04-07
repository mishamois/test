'use script'

let btn_brush = document.getElementById('brush');
let btn_line = document.getElementById('line');
let btn_circle = document.getElementById('circle');
let btn_rectangle = document.getElementById('rectangle');

function set_tool(tool_name) {
    current_tool = tool_name;
}

let current_tool = 'brush';

btn_brush.onclick = () => set_tool('brush');
btn_line.onclick = () => set_tool('line');
btn_circle.onclick = () => set_tool('circle');
btn_rectangle.onclick = () => set_tool('rectangle');


let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;
let startX, startY;

function startDrawing(event) {
    isDrawing = true;
    startX = event.offsetX
    startY = event.offsetY

}

function draw (event) {
    if (!isDrawing) return;
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.strokeStyle = document.getElementById('colorPicker').value
    ctx.lineWidth = document.getElementById('lineWidth').value
    if (current_tool == 'brush') {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
        startX = x;
        startY = y;
    }

}

function endDrawing(event) {
    isDrawing = false

}

canvas.addEventListener('mousedown', startDrawing)
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', endDrawing)
canvas.addEventListener('mouseout', endDrawing)