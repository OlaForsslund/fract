/// <reference path="vector.ts" />
/// <reference path="matrix.ts" />
/// <reference path="shaderUtils.ts" />
/// <reference path="Model.ts" />

 class Mandel extends Model{
  r:number=1;
  g:number=1;
  b:number=1;
  a:number=0;
  indexBuffer;
  indexBufferLength;
  constructor(gl, width, height){
    super();
    // Create the vertecies
    let M:Matrix = new Matrix(4,4);
    M.set(0, 0, -width/2);
    M.set(0, 1, -height/2);
    M.set(1, 0, width/2);
    M.set(1, 1, -height/2);
    M.set(2, 0, width/2);
    M.set(2, 1, height/2);
    M.set(3, 0, -width/2);
    M.set(3, 1, height/2);
      
    this.Initialize(gl, M, common_vs, line_fs); 
          // This sectin should be moved to init
          var indices = [3,2,1,3,1,0];
          this.indexBufferLength = indices.length;
          // Create buffer object to store indecies
          this.indexBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    
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
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      
      gl.drawElements(gl.TRIANGLES, this.indexBufferLength, gl.UNSIGNED_SHORT,0);
      //gl.drawArrays(gl.GL_QUADS, 0, this.vertexCount);
    }     
    else{
      console.log("model not intialized!")
    }
  }
}