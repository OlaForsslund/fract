#version 300 es
precision mediump float;

in vec2 c;

out vec4 colorOut;
 
void main() {
    vec2 z=c;
    float abs2;
    int n;
    for( n=1;n<100;n++){
        abs2=z.x*z.x + z.y*z.y;
        z=vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y ) + c;
        if(abs2 > 4.0){
            break;
        }
    }
    colorOut = vec4( 0.0, 0.0, float(n)/100.0, 1.0);
}
