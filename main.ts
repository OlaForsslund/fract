/// <reference path="vector.ts" />
/// <reference path="matrix.ts" />
/// <reference path="helpers.ts" />
/// <reference path="shaderUtils.ts" />
/// <reference path="model.ts" />
/// <reference path="grid.ts" />
let preButton=0;

let models:Model[]=[];
var first=true;
let frameCount:number=0;
let cls = true;
let keepRunning = false;
let doRender = true;

// Initialize the GL context
const canvas = <HTMLCanvasElement> document.getElementById("glCanvas");
const gl = <WebGL2RenderingContext> canvas.getContext("webgl2", { alpha: false, antialias: false, preserveDrawingBuffer: true} );
// Only continue if WebGL is available and working
if (gl) {
    canvas.onmousemove = function (event:MouseEvent){        
      let x = event.clientX;
      let y = event.clientY;
      switch (event.buttons){
        case 0: preButton=0;                   
  	    document.getElementById("debugLine").innerHTML = "Mouse at " + x + ", "+y; 
        break;        
        case 1:
        { 
          if(preButton!=1) {
            preButton = event.buttons;   
      	    document.getElementById("debugLine").innerHTML = "Mouse at " + x + ", "+y+" button flank"; 
          }
          else{
            document.getElementById("debugLine").innerHTML = "Mouse at " + x + ", "+y+" button down"; 
          } 
        }
      }          
  };
  main();
}
else{
  alert("Unable to initialize WebGL. Your browser or machine may not support it.");    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function main() {
  let myGrid = new Grid(gl, .1, 0);
  let mandel = new Mandel(gl, 1,1);
  myGrid.SetRotation(new Vector(3.14/2.0,0,0,0));
  myGrid.SetColor(1,0,0,1);
  models[0] = myGrid;
  
  //mandel.SetRotation(new Vector(3.14/2.0,0,0,0));
  mandel.SetColor(1,1,0,1);
  models[1] = mandel;
  requestAnimationFrame(drawScene);  
}

function drawScene(timestamp){              
    let viewMatrix:Matrix = new Matrix(4,4);
    viewMatrix.setIdentity();
    if( doRender )
    {    
      //Let us use CSS to set canvas size
      if(first){
        first=false;
        var width = gl.canvas.width;
        var height = gl.canvas.height;
  
        gl.canvas.width = width;
        gl.canvas.height = height;
        resize(gl.canvas); 
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      frameCount++;  
      
      models[0].Draw(gl, viewMatrix);
      models[1].Draw(gl, viewMatrix);


    if(keepRunning){
      requestAnimationFrame(drawScene);  
    } 
  }   
}