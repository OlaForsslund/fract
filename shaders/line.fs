#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. mediump is a good default. It means "medium precision"
precision mediump float;

// we need to declare an output for the fragment shader
out vec4 outColor;
in float color;
uniform vec4 lineColor;
void main() {  
  vec4 v_color = vec4(1.,1.,1.,0.);  
  vec2 r = 2.0*gl_PointCoord - 1.0;
  //float d = r.x*r.x;   
  float d=1.;
  //outColor = vec4( v_color.r*d, v_color.g*d, v_color.b*d, 1. );
  outColor = lineColor;
}
