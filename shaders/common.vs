#version 300 es
 
in vec4 a_position;
uniform mat4 u_matrix;
out float color;
void main() {
  // Unpack color from position, replacing with 1 and mul by viewspace
  color = a_position.a;
  vec4 v = u_matrix * vec4(a_position.xyz, 1.0);
  gl_Position = v;
}