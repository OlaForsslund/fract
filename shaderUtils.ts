function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);  
    shader = null;
  } 
  return shader;  
}


function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program); 
    program = null;
  }  
  return program;
}

function createProgramFromSource(gl, vertexShaderSource:string, fragmentShaderSource:string) {
  let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.deleteShader(vertexShader);  // Free up now that progrom is compiled
  gl.attachShader(program, fragmentShader);
  gl.deleteShader(fragmentShader);// Free up now that progrom is compiled

  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!success) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program); 
    program = null;
  }  
  return program;
}

