/// <reference path="vector.ts" />
/// <reference path="matrix.ts" />
/// <reference path="shaderUtils.ts" />

abstract class Model{
  position:Vector;
  rotation:Vector;
  VAOs:WebGLVertexArrayObject[]=[];
  VBOs:WebGLBuffer[]=[];            // Buffer on graphics card with the model vertecis
  renderProgram;
  matrixLocation;
  vertexAttributeLocation;
  vertexCount;
  initailized:Boolean = false;
  constructor( ){    
    this.position= new Vector(0,0,0,0);
    this.rotation= new Vector(0,0,0,0);
  }

  Initialize(gl, vertices:Matrix, vertexShaderSource:string, fragmentShaderSource:string){
    // Set up the shaders   
    this.renderProgram = createProgramFromSource(gl, vertexShaderSource, fragmentShaderSource);
    
    // Set up and upload the model vertices to the graphics card
    this.VAOs[0] = gl.createVertexArray();
    gl.bindVertexArray(this.VAOs[0]);
    var vertexAttributeLocation = gl.getAttribLocation(this.renderProgram, "a_position");
    gl.enableVertexAttribArray(vertexAttributeLocation);  // a_position in shader should be taken from the buffer
    
    this.VBOs[0] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VBOs[0]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices.A, gl.STREAM_COPY);
    gl.vertexAttribPointer(vertexAttributeLocation, vertices.cols, gl.FLOAT, false, 0, 0);
    this.vertexCount = vertices.rows;


    this.matrixLocation = gl.getUniformLocation(this.renderProgram, "u_matrix");
    // Reset bindings
    gl.bindVertexArray(null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.initailized = true;
  }

  abstract Draw(gl, viewMatrix:Matrix):void;
  
  setPosition(p:Vector){
    this.position = p;
  }
  getPosition(){
    return this.position;
  }
  SetRotation(r:Vector){
    this.rotation =r;
  }
  
}
