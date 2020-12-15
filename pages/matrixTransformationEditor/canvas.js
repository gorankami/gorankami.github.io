let defRect = [5,5,5,10,10,5,10,10]
let rects = []

const canvas = document.querySelector("#canvasTransformationEditor")
const ctx = canvas.getContext("2d")
const formula = document.querySelector("#formula")
let {width, height} = canvas;
const operations = [getTranslationString, getRotationString, getScaleString]
let operation = operations[0]

reset();
draw();   


function switchTab(tab){
    const tabs = document.querySelectorAll(".tab")
    tabs.forEach(t=>t.className="tab")
    tabs[tab].className="tab tab-active";
    operation = operations[tab]
    draw()
}

function draw(){
    resetStyle();
    ctx.fillRect(0, 0, width, height)
    
    drawXY(ctx, width, height);
    drawCoordSystem(ctx, width, height)
    drawRects()

    const texString = operation(10,20)
    renderTex(texString, formula);
}

function resetStyle(){
    ctx.strokeStyle = "black";
    ctx.fillStyle="#CCC";
    ctx.setLineDash([])
    ctx.lineWidth = 1;
}

function drawXY(){
    ctx.beginPath();
    ctx.moveTo(10,10)
    ctx.lineTo(10,height-10)
    ctx.lineTo(width-10,height-10)
    ctx.stroke()
}

function drawCoordSystem(){
    ctx.beginPath();
    ctx.setLineDash([5,3])
    
    ctx.lineWidth = 0.5;
    for(let i=20;i<height-20;i+=20){
        let y = height-10-i
        ctx.moveTo(10, y)
        ctx.lineTo(width-10, y)
    }
    for(let i=20;i<width-20;i+=20){
        let x = width-10-i
        ctx.moveTo(x, 10)
        ctx.lineTo(x, height-10)
    }
    ctx.stroke()

    ctx.setLineDash([])
}

function drawRects(){
    ctx.lineWidth = 2;
    for(let i=0;i<rects.length;i++){
        let rect = rects[i]
        console.log(rect)
        ctx.beginPath()

        ctx.strokeStyle = "green";
        ctx.moveTo(rect[0]*20+10,rect[1]*20+10)
        ctx.lineTo(rect[2]*20+10,rect[3]*20+10)
        ctx.lineTo(rect[6]*20+10,rect[7]*20+10)
        ctx.lineTo(rect[4]*20+10,rect[5]*20+10)
        ctx.lineTo(rect[0]*20+10,rect[1]*20+10)
        ctx.stroke()
    }
}

function reset(){
    rects = [defRect];
}

