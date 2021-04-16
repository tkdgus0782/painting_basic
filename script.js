//https://webdoli.tistory.com/ 참고중

function init(){
	window.canvas = document.getElementById('paint');	
	window.scr = canvas.getContext('2d');
	
	canvas.width = document.body.offsetWidth * 0.8;
	canvas.height = canvas.width * 0.75;
	
	window.width = canvas.width;
	window.height = canvas.height;
	
	window.drawing = false;//현재 그리기 중인지?
	window.randomColor = false;//현재 계속 색바꾸기 모드를 켯는지?
	window.brushSize = 7;
	window.brushColor = 'black';
	
	window.painting = [];
	
	document.addEventListener('mousedown', mousedownHandler);//마우스 누를때
	document.addEventListener('mouseup', mouseupHandler);//마우스 뗄때
	document.addEventListener('mousemove', mousemoveHandler);//마우스 움직일때
	
	loop();
}

function mousedownHandler(input){
	drawing = true;
}

function mouseupHandler(input){
	drawing = false;
}

function mousemoveHandler(input){
	if(drawing){
		const relativeX = input.clientX - canvas.offsetLeft;//모니터 왼쪽부터 거리 - 캔버스왼쪽부터 거리 == 원하는거리
		const relativeY = input.clientY - canvas.offsetTop;//이하동문
		
		if(randomColor){
			change();
		}
		
		const newDot = new brush(relativeX, relativeY, brushColor);
		
		painting = [...painting, newDot];//페인팅 배열에 새로운 점을 추가!
	}
}

function brush(x, y, c){//점 객체 모여서 선으로 표현 핢
	this.x = x;
	this.y = y;
	this.r = brushSize;
	this.color = c;
}

function drawDot(){//점을 그리는 건데 결국 선이 됨.
	painting.forEach(function(dot, i){	
		scr.beginPath();
		scr.fillStyle = dot.color;
		scr.arc(dot.x, dot.y, dot.r, 0,  2*Math.PI);
		scr.fill();
		scr.closePath();
	});
}

function change(){//색 변환
	const R = Math.floor((Math.random() * 256));//랜덤함수 = 0~0.99999.... 를 반환함. floor는 소수점 버림
	const G = Math.floor((Math.random() * 256));
	const B = Math.floor((Math.random() * 256));
	
	brushColor = 'rgba(' + R + ',' + G + ',' + B + ',1)'; 
}

function randomize(){
	randomColor = !(randomColor);
}

function draw(){
	scr.clearRect(0, 0, width, height);
	drawDot();
}

function loop(){
	draw();
	requestAnimationFrame(loop);
}
