#version 300 es
 
uniform mat4 u_matrix;

in vec4 texCoord;
out  vec2 c;
in vec4 a_position;
void main() {
  // Unpack color from position, replacing with 1 and mul by viewspace
  vec4 v = u_matrix * vec4(a_position.xyz, 1.0);
  
  c = texCoord.xy;  
  gl_Position = v;
}