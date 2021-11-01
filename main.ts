/// <reference path="vector.ts" />
/// <reference path="matrix.ts" />
/// <reference path="shaderUtils.ts" />
/// <reference path="model.ts" />
/// <reference path="grid.ts" />

let models:Model[]=[];
var first=true;

// Initialize the GL context
const canvas = <HTMLCanvasElement> document.getElementById("glCanvas");
const gl = <WebGL2RenderingContext> canvas.getContext("webgl2", { alpha: false, antialias: false, preserveDrawingBuffer: true} );

let mouse:Vector = new Vector(0,0,0,0);
let mouseButton:boolean = false;
// Only continue if WebGL is available and working
if (gl) {
    canvas.onmousedown = function (event:MouseEvent){        
      let x = event.clientX;
      let y = event.clientY;
      mouseButton=true;
      mouse.x=x;
      mouse.y=y;           
  };
  canvas.onwheel = function(event:WheelEvent){
    mouse.z+=event.deltaY;
  };
  main();
}
else{
  alert("Unable to initialize WebGL. Your browser or machine may not support it.");    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function main() {
  //let myGrid = new Grid(gl, .1, 0);  
  //myGrid.SetRotation(new Vector(3.14/2.0,0,0,0));
  //myGrid.SetColor(1,0,0,1);  
  
  let mandel = new Mandel(gl, 4,4);  
  mandel.SetColor(1,1,0,1);  
  models[0] = mandel;
  //models[1] = myGrid;
  requestAnimationFrame(drawScene);  
}

var zoom=1;
let aspectRatio:number;
const fixedDepth=-2;
let newCenterTarget:Vector = new Vector(0,0,0,0);
var preTimestamp;
function drawScene(timestamp){
  if(first){        
    first=false;
    
    // Use CSS to set canvas size (stolen code, pure magic)    
    var width = gl.canvas.width;
    var height = gl.canvas.height;
    gl.canvas.width = width;
    gl.canvas.height = height;          
    resize(gl.canvas); 
    
    // Setup viewport, might want to do this on window resize, but it complicates things
    aspectRatio=gl.drawingBufferWidth/gl.drawingBufferHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

    models[0].setPosition( new Vector( 0, 0, fixedDepth, 0) );
  }

  document.getElementById("fps").innerHTML="FPS = " + (1000/(timestamp-preTimestamp)).toFixed(0) + " Zoom=" + zoom.toPrecision(4);
  preTimestamp = timestamp;

  // Clear screen
  if( true ){      
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  let viewMatrix:Matrix = getViewTransform(zoom*36, aspectRatio, 1, 1000);

  // Calculate new center where clicked
  if(mouseButton){
    mouseButton=false;   
    // Find mouse point in normalized (to height) coords        
    newCenterTarget.x= aspectRatio*(mouse.x/gl.drawingBufferWidth - 0.5);
    newCenterTarget.y= -1*(mouse.y/gl.drawingBufferHeight - 0.5);         
    // Invert view transform
    newCenterTarget.mulS( new Vector( fixedDepth/zoom, fixedDepth /zoom, 0, 0));
  }

  // Animate the move
  let move:Vector = newCenterTarget.copy();
  move.mulN(0.05);
  newCenterTarget.subV(move);

  move.addV(models[0].getPosition());
  move.z=fixedDepth; // Force depth fixed
  models[0].setPosition(move);

  // Animate zoom
  zoom *= (1 - mouse.z/1000000);    
  
  // Draw all models
  models[0].Draw(gl, viewMatrix);  

  // Draw at next frame
  requestAnimationFrame(drawScene);  
}

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (canvas.width  !== displayWidth ||
      canvas.height !== displayHeight) {
 
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}
