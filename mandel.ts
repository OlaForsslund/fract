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
  textureCoordBuffer;
  texAttributeLocation;
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
      
    this.Initialize(gl, M, mandel_vs, mandel_fs); 
    // This section should be moved to init
    var indices = [3,2,1,3,1,0];
    this.indexBufferLength = indices.length;
    // Create buffer object to store indecies
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    // Bind texture coords      
    this.textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
    const textureCoordinates = [      
      0.0,  0.0,
      1.0,  0.0,
      1.0,  1.0,
      0.0,  1.5 ];  
      
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
     this.texAttributeLocation = gl.getAttribLocation(this.renderProgram, "texCoord");     
     gl.enableVertexAttribArray( this.texAttributeLocation );
     gl.vertexAttribPointer( this.texAttributeLocation , 2, gl.FLOAT, false, 0, 0);
     
     gl.bindBuffer(gl.ARRAY_BUFFER,null);
    
    console.log("textureCoordBuffer=" + this.textureCoordBuffer);

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
 

      gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);

      // Bind the attribute/buffer      
      gl.bindVertexArray(this.VAOs[0]);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);    
      //gl.drawArrays (gl.TRIANGLES, 0, 3);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT,0);
      
    }     
    else{
      console.log("model not intialized!")
    }
  }
}