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
let keepRunning = true;
let doRender = true;

let mouse:Vector = new Vector(0,0,0,0);
// Initialize the GL context
const canvas = <HTMLCanvasElement> document.getElementById("glCanvas");
const gl = <WebGL2RenderingContext> canvas.getContext("webgl2", { alpha: false, antialias: false, preserveDrawingBuffer: true} );

// Only continue if WebGL is available and working
if (gl) {
    canvas.onmousedown = function (event:MouseEvent){        
      let x = event.clientX;
      let y = event.clientY;
      switch (event.buttons){
        case 0: preButton=0;                   
  	    document.getElementById("debugLine").innerHTML = "Mouse at " + x + ", "+y;         
        break;        
        case 1:
        { 
          mouse.x=x;
          mouse.y=y;
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
  canvas.onwheel = function(event:WheelEvent){
    mouse.z=event.deltaY;
  };
  main();
}
else{
  alert("Unable to initialize WebGL. Your browser or machine may not support it.");    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function main() {
  // let myGrid = new Grid(gl, .1, 0);  
  //myGrid.SetRotation(new Vector(3.14/2.0,0,0,0));
  //myGrid.SetColor(1,0,0,1);  
  
  let mandel = new Mandel(gl, 4,4);  
  mandel.SetColor(1,1,0,1);  
  models[0] = mandel;
  //models[1] = myGrid;
  requestAnimationFrame(drawScene);  
}

var zoom=10;
let preMouse:Vector = new Vector(1,0,0,0);
function drawScene(timestamp){              
    doRender = !mouse.equal(preMouse);
    preMouse.copy(mouse);
    
    //if( doRender )
    { 
      //Let us use CSS to set canvas size
      if(first){
        mouse.x=0;
        mouse.y=0;
        first=false;
        var width = gl.canvas.width;
        var height = gl.canvas.height;
  
        gl.canvas.width = width;
        gl.canvas.height = height;
        resize(gl.canvas); 
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      frameCount++;  
      document.getElementById("fps").innerHTML="Frame " + frameCount;
      
      if( true ){
        // Set clear color to black, fully opaque        
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }  

    // Find mouse point in normalized coords      
     let pos:Vector = new Vector(0,0,0,0);
     pos.x= (mouse.x/gl.drawingBufferWidth - 0.5);
     pos.y= -1*(mouse.y/gl.drawingBufferHeight - 0.5);     
     zoom = zoom*(1-mouse.z/100000);

     let viewMatrix:Matrix = getViewTransform(zoom*36, gl.drawingBufferWidth/gl.drawingBufferHeight, 1, 1000);   
     let v:Vector = viewMatrix.mulV(pos);
     
     document.getElementById("text").innerHTML="mouse " + mouse.print() + " normcoord=" + pos.print() + " multiplied=" + v.print()+ " zoom=" + zoom +
     "<br><br>" + viewMatrix.print();  
     
     pos.mulN(-2*10/zoom);  // fulhack för att slippa invertera viewMatrix: viewmatrix ger 2;an, pos.z ger 10
     pos.addV(models[0].getPosition());
  
      pos.z=-10; 
      if( doRender )      models[0].setPosition(pos);
      models[0].Draw(gl, viewMatrix);  
    }   

  if(keepRunning){
    requestAnimationFrame(drawScene);  
  } 
}

