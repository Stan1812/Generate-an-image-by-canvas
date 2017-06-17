
var canvas=document.getElementById('canvas');
var ctx=canvas.getContext('2d');
			
var addtext=document.getElementById('addtext')

//beiing

//canvas辣鸡尺寸调整，发现在基于canvas的时候拖动貌似不是很好解决
function cvs_size_(){
	
		function cvs_size_chag(event){

			var w_x=event.layerX;
			var h_y=event.layerY;
			canvas.height=h_y;
			canvas.width=w_x;

		}  


		var i=0;
		
		canvas.addEventListener('click',function(){
	
		if (i==0) 
		{cvs_size_chag(event);i=1}

});
}

var cvs_size_btn=document.createElement('div');
cvs_size_btn.appendChild(document.createTextNode('>'));
cvs_size_btn.style.cssText="width:20px; height:20px;background:red;float:right"
 document.getElementById('item1').appendChild(cvs_size_btn);


cvs_size_btn.addEventListener('click',cvs_size_);



//展示和隐藏切换
	

function toggle(targetid){
		if (document.getElementById){  
			console.log(targetid.style.display)            
						if (targetid.style.display==""){
								targetid.style.display="none";
						} else {
								targetid.style.display="";
						}
		}
}


//文字取色模块
var canvas2=document.getElementById('canvas2');
var ctx2=canvas2.getContext('2d');

//先画上一个简单的图吧。。粗暴渐变
var linear_gra=ctx2.createLinearGradient(0,0,300,300);
linear_gra.addColorStop(0,'white');
linear_gra.addColorStop(1/7,'red');
linear_gra.addColorStop(2/7,'orange');
linear_gra.addColorStop(3/7,'yellow');
linear_gra.addColorStop(4/7,'green');
linear_gra.addColorStop(5/7,'blue');
linear_gra.addColorStop(6/7,'purple');
linear_gra.addColorStop(1,'black');

ctx2.fillStyle=linear_gra;
ctx2.beginPath();
ctx2.fillRect(0,0,300,300);



/* 更加精确的，，但是现在写的有点晕。。不知道怎么算。。心态崩了
for (var i=0;i<300;i++){
		for (var j=0;j<300;j++){
			ctx2.fillStyle = 'rgb(' + Math.floor(255-42.5*i) + ',' + 
											 Math.floor(255-42.5*j) + ',0)';
			ctx2.fillRect(j*1,i*1,1,1);
		}
}
*/


var color = document.getElementById('color');

function pick(event) {
	var x = event.offsetX;
	var y = event.offsetY;
	var pixel = ctx2.getImageData(x, y, 1, 1);
	var data = pixel.data;
	var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',' + (data[3] / 255) + ')';
	color.style.background = rgba;
	color.textContent = rgba;
	console.log(rgba,x,y)
	ctx.fillStyle=rgba;
	ctx.strokeStyle=rgba;

}
canvas2.addEventListener('click', pick);



//获取文本输入框的内容
//文字写入&文字删除
 var Confirm=document.getElementById('confirm');
 var Cancel=document.getElementById('cancel')
//写入文字
Confirm.addEventListener('click',function(){
	var txt=document.getElementById('addtext').value;	
	console.log(txt);


	//文字样式的设置
	//test
	var pos_x=document.getElementById('pos_x').value;
	var pos_y=document.getElementById('pos_y').value;
	var txt_rot=document.getElementById('txt_rot').value;
	var font=document.getElementById('fonter').value;
	console.log(pos_x,pos_y,txt_rot);
	ctx.save();
	ctx.font = 'bold '+font+'px Arial';
	ctx.rotate(Math.PI*txt_rot/180);
	console.log(Math.PI*txt_rot/180);
	ctx.fillText(txt,pos_x,pos_y);

})

//删除文字部分
//不知道该怎样只把文字给删掉而不断删掉整个图片
//现在竟然做成了清除整个canvas的按钮，，尴尬
Cancel.addEventListener('click',function(){
	console.log("laji")
	ctx.clearRect(0,0,1000000,1000000)
	clear_lines();
	console.log(linex,liney,linen);


})


//上传和下载按钮
var but1=document.getElementById('upload');			
var btn2=document.getElementById('download');

//上传图片模块

var scal_control=document.getElementById('_scale').value;

var pic1=document.getElementById('uppic').value;
console.log(pic1)

	function readAsDataURL(){
		
		if (!document.getElementById('read_pic_but').className) 
			{document.getElementById('read_pic_but').className+='button';}
		else{document.getElementById('read_pic_but').className=""}
		console.log(document.getElementById('read_pic_but').className)

		//检验是否为图像文件
		var file = document.getElementById("uppic").files[0];
		if(!/image\/\w+/.test(file.type)){
				alert('仅支持上传图片');
				return false;
		}
		var reader = new FileReader();
		//将文件以Data URL形式读入页面
		reader.readAsDataURL(file);
		reader.onload=function(e){
				var picture=this.result;
				var pic=new Image();
				pic.src=picture;
				//调整图片的大小
				var scal_control=document.getElementById('_scale').value; 

				if (scal_control!="") 
				{ ctx.scale(scal_control,scal_control);}
			if (scal_control="")
			{
					scal_control= 1;
					ctx.scale(scal_control,scal_control);     		
				};
				
				console.log(scal_control);
				ctx.drawImage(pic,0,0)
				return pic;

				

		}
}

//图片处理的其他功能-----------------------------------------------------------

//图片处理中的各种滤镜

function pix_procs(){

	var imageData0 = ctx.getImageData(0, 0, canvas.width,canvas.height);
	var data0 = imageData0.data;
	data_length=data0.length;
	//黑白效果
	function grayscale(id)  {
			for (var i = 0; i < data_length; i += 4) {
			 var avg = (data0[i] + data0[i + 1] + data0[i + 2]) / 3;
				data0[i]     = avg; // red
				data0[i + 1] = avg; // green
				data0[i + 2] = avg; // blue
			}
			ctx.putImageData(imageData0, 0, 0);
			console.log(imageData0);
			
		};

	//负片效果
	function negative(){
		for(var j=0;j<data_length;j+=4){
			data0[j]=255-data0[j];
			data0[j+1]=255-data0[j+1];
			data0[j+2]=255-data0[j+2];
		}
		ctx.putImageData(imageData0, 0, 0);
		console.log(imageData0);

	}
	
	//高斯模糊
	function gauss_blur_() {
		stackBlurCanvasRGBA('canvas',0,0, 1000, 500, 3 );
	}

 var grayscalebtn = document.getElementById('grayscalebtn');
 grayscalebtn.addEventListener('click',grayscale);

 var negativebtn = document.getElementById('negative');
 negativebtn.addEventListener('click',negative);

 var gauss_blur_btn=document.getElementById('gauss_blur');
 gauss_blur_btn.addEventListener('click',gauss_blur_)
  console.log("im clicked")
}

var pix_procsbtn=document.getElementById('pix_procs');
pix_procsbtn.addEventListener('click',function(){
	if (!document.getElementById('pix_procs').className) 
			{document.getElementById('pix_procs').className+='button';}
	else{document.getElementById('pix_procs').className=""};
	pix_procs()
})

//打马赛克

function mosaic_drawer_ctol(){
	function mosaic_drawer(event) 
	{
		var layer_x=event.offsetX;
		var layer_y=event.offsetY;4
		var pix = ctx.getImageData(0,0,10,10);
		console.log(pix);
			ctx.putImageData(pix,layer_x,layer_y);
	}
		canvas.addEventListener('click',function(){
			var i=0;
			if (i==0) { 
			mosaic_drawer(event);
			i=1;}
		});}
document.getElementById('mosaic_drawer').addEventListener('click',mosaic_drawer_ctol)

//----------------------------------------------
//手写笔迹

//非常不情愿。。但是还是把变量定义到了全局。。闭包还是不会用。。继续看吧。。
 var linex = new Array();  
 var liney = new Array();  
 var linen = new Array();  
	
 var lastX = -1;  
 var lastY = -1;  

 var flag = 0; 


function line_drawer() {
	

canvas.addEventListener('mousemove', onMouseMove, false);  
 canvas.addEventListener('mousedown', onMouseDown, false);  
 canvas.addEventListener('mouseup', onMouseUp, false);  
 

	
 function onMouseMove(evt) {  
		if (flag == 1) {  
			 linex.push(evt.layerX);  
			 liney.push(evt.layerY);  
			 linen.push(1);  
			 ctx.beginPath();  
			 ctx.lineWidth = 1 + Math.random() * 5;  
	
			 for (var i=1;i<linex.length;i++) {  
						 lastX = linex[i];  
						 lastY = liney[i];  
						 if (linen[i] == 0) {  
								ctx.moveTo(lastX,lastY);  
						 } else {  
								ctx.lineTo(lastX,lastY);  
						 }  
			 } 
			 ctx.stroke();
		}  
 }  
 function onMouseDown(evt) {  
		flag = 1;  
		linex.push(evt.layerX);  
		liney.push(evt.layerY);  
		linen.push(0);  
 }  
 function onMouseUp(evt) {  
		flag = 0;  
		 linex.push(evt.layerX);  
		 liney.push(evt.layerY);  
		linen.push(0);  
 }  

}


//清除画布时清除数组信息
function clear_lines(){
	/*for(var j=0;j<linex.length;j++)
	{
		linex.pop();
		liney.pop();
		linen.pop();
	}这个方法不知道为什么不能将数组清空。。。
	*/
	linex.length=0;
	liney.length=0;
	linen.length=0;
}

document.getElementById('line_drawer').addEventListener('click',line_drawer);



//模糊图片画笔
function blur_drawer(){

}


//放大镜功能

function magnifying_glass(event){
	

	var imgcan = document.getElementById("canvas"),
        glasscan = document.getElementById("canvas3"),
        imgContext = imgcan.getContext("2d"),
        glassContext = glasscan.getContext("2d"),
        img = new Image(),
        mouse = captureMouse(imgcan);
   
    img.onload = function(){ 
        imgContext.drawImage(pic,0,0);
    }
    //获取元素内鼠标位置
    function captureMouse(element){
        var  mouse = {x:0 , y:0};
        element.addEventListener('mousemove' , function(event){
        var x , y;
        if(event.pageX || event.pageY){
            x = event.pageX;
            y = event.pageY;
        }else{
            x = event.clientX + (document.body.scrollLeft || 
            document.documentElement.scrollLeft);
            y = event.clientY + (document.body.scrollTop || 
            document.documentElement.scrollTop);
        }
        x -= element.offsetLeft;
        y -= element.offsetTop;
        mouse.x = x;
        mouse.y = y;
        } , false)
        return mouse;
    }
    //给画布绑定鼠标移动事件
    imgcan.addEventListener("mousemove",mouse_move)
     function mouse_move(){
            glassContext.clearRect(0,0,glasscan.width,glasscan.height);
            glasscan.style.left = mouse.x + 10 + 'px';
            glasscan.style.top = mouse.y + 10 + 'px';
            glasscan.style.display = "block";
            var drawWidth = 50,
                drawHeight = 50;
            glassContext.drawImage(canvas,mouse.x-drawWidth/4,mouse.y-drawHeight/4,drawWidth,drawHeight,0,0,drawWidth*4,drawHeight*4);     //实现放大镜
    };
    //绑定鼠标移出事件
    imgcan.onmouseout = function(){
            glasscan.style.display = "none";
    }

}	



var mag_glass=document.getElementById('magnifying_glass')
mag_glass.addEventListener('click',function(){
	 var i=1;
	 if (i==1) {magnifying_glass(event);
	 console.log("laji");i++
	 console.log(i)}
	
})


//下载模块

btn2.addEventListener('click',function(){
	var type='jpg';
	download(type)
})
//图片下载操作,指定图片类型
function download(type) {

		//设置保存图片的类型
		var imgdata = canvas.toDataURL(type);
		
		//将mime-type改为image/octet-stream
		var fixtype = function (type) {
				type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
				var r = type.match(/png|jpeg|bmp|gif/)[0];
				return 'image/' + r;
		}
		imgdata = imgdata.replace(fixtype(type), 'image/octet-stream')
		
		//将图片保存到本地
		var saveFile = function (data, filename) {
				var link = document.createElement('a');
				link.href = data;
				link.download = filename;
				var event = document.createEvent('MouseEvents');
				event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				link.dispatchEvent(event);
			 
				console.log(canvas.width,canvas.height)
		}
		var filename = new Date().toLocaleDateString() + '.' + type;
		saveFile(imgdata, filename);
}
