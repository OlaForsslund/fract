/// <reference path="vector.ts" />
/// <reference path="matrix.ts" />
/// <reference path="helpers.ts" />
let preButton=0;

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


unction main() {           
  InitNewWorld(reloadPartCount);    
  myGrid = new Grid(gl, 400, 0);
  myGrid.SetRotation(new Vector(3.14/2.0,0,0,0));
  requestAnimationFrame(drawScene);  
}

var first=true;
function drawScene(timestamp){          
    let doRender = false;
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
      
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); // screen      
      gl.clear(gl.DEPTH_BUFFER_BIT);
      if( !doTrace ){
        // Set clear color to black, fully opaque        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

    if(keepRunning){
      requestAnimationFrame(drawScene);  
    }    
}