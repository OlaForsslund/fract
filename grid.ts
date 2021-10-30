/// <reference path="vector.ts" />
/// <reference path="matrix.ts" />
/// <reference path="shaderUtils.ts" />
/// <reference path="Model.ts" />

 class Grid extends Model{
  r:number=1;
  g:number=1;
  b:number=1;
  a:number=0;
  constructor(gl, gridSpacing, height){
    super();
    // Create the vertecies
    let max = 200000;
  
    let lineCount=2+2*2*(max/gridSpacing);
    let M:Matrix = new Matrix(2*lineCount,4);
    let v = -max;
    let i=0;
    for(i=0; i < lineCount/2; i++){
      M.set(2*i, 0, v);
      M.set(2*i, 1, height);
      M.set(2*i, 2, -max);
      M.set(2*i, 3, 1);
      
      M.set(2*i+1, 0, v);
      M.set(2*i+1, 1, height);
      M.set(2*i+1, 2, max);
      M.set(2*i+1, 3, 1);      
      v+=gridSpacing;
    }    
    v=-max;
    for(; i < lineCount; i++){
      M.set(2*i, 0, -max);
      M.set(2*i, 1, height);
      M.set(2*i, 2, v);
      M.set(2*i, 3, 1);
      
      M.set(2*i+1, 0, max);
      M.set(2*i+1, 1, height);
      M.set(2*i+1, 2, v);
      M.set(2*i+1, 3, 1);      
      v+=gridSpacing;
    }
    
    this.Initialize(gl, M, common_vs, line_fs); 
  }

  SetColor(r,g,b,a){
      this.r=r;
      this.g=g;
      this.b=b;
      this.a=a;
  }

  Draw(gl, viewMatrix:Matrix){    
    if(this.initailized){      
      gl.useProgram(this.renderProgram);      

      let M:Matrix = getTranslateRotateM(this.position, this.rotation);  // Possition and rotate the model into the world
      // TODO: Scaleing should be here as well

      M=M.mul(viewMatrix); // Move the world to the camera   
      
      gl.uniformMatrix4fv(this.matrixLocation, false, M.A);  // Set the matrix


      var colorLocation = gl.getUniformLocation(this.renderProgram, "lineColor");
      gl.uniform4f(colorLocation, this.r, this.g, this.b, this.a );

      // Bind the attribute/buffer
      gl.bindVertexArray(this.VAOs[0]);
                    
      
      gl.drawArrays(gl.LINES, 0, this.vertexCount);
    }     
    else{
      console.log("model not intialized!")
    }
  }
}