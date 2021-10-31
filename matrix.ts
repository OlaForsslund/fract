/// <reference path="vector.ts" />

class Matrix{
    A:Float32Array;
    cols:number;
    rows:number;
    constructor(rows:number, cols:number){
        this.cols=cols;
        this.rows=rows;
        let i:number=0;
        this.A = new Float32Array(rows*cols).fill(0);
    }
    setIdentity(){
        let i=0;
        for(var r=0;r<this.rows;r++){
            for(var c=0;c<this.cols;c++){
                if(r==c)
                    this.A[i++]=1;
                else
                    this.A[i++]=0;
            }
        }      
        return this;  
    }
    mulV(v:Vector){
        return new Vector( this.getV(0).dot(v), this.getV(1).dot(v), this.getV(2).dot(v), this.getV(3).dot(v) );
    }
    mulN(n:number){        
        for(let i=0; i < this.A.length; i++){
            this.A[i]*=n;
        }
        return this;        
    }    
    // Calculates C=A*B where B is the parameter, returns new matrix C
    mul(B:Matrix){                
        if(this.cols == B.rows){
            let C=new Matrix(B.rows,this.cols);
            let i=0;
            for(let r=0; r<B.rows; r++){                
                for(let c=0;c < this.cols; c++){
                    for(let j=0; j<B.rows;j++){
                        C.A[i]+=this.A[this.cols*r+j] * B.A[this.cols*j+c];
                    }                    
                    i++;
                }                
            }
            return C;
        }
        else{
            console.log("Matrix sizes do not match, this.cols=" + this.cols + "B.rows=" + B.rows );
            return null;
        }
    }
    print(){
        let str:string="";        
        let i=0;
        for(let r=0; r<this.rows;r++){
            for(let c=0; c<this.cols;c++){
                str += this.get(r,c).toPrecision(4);
                if(c != this.cols-1){
                    str+=", ";
                }
                else{
                    str+="<br>";
                }
            }
        }        
        return str;
    }
    set(row,col,value){        
        this.A[ row * this.cols + col] = value;
    }
    setRow(row:number, v:Vector){
        this.A[ row * this.cols + 0] = v.x;
        this.A[ row * this.cols + 1] = v.y;
        this.A[ row * this.cols + 2] = v.z;
    }
    get(row,col){        
        return this.A[ row * this.cols + col];
    }
    getV(row){
        let offsett=row * this.cols;
        return new Vector( this.A[ offsett++], this.A[ offsett++],this.A[ offsett++], this.A[ offsett++]);
    }
    getRefV(row){
        let offsett=row * this.cols;
        return new Vector( this.A[ offsett++], this.A[ offsett++],this.A[ offsett++], this.A[ offsett++]);
    }
}


function getTranslateRotateM(translation:Vector, rotation:Vector){
  let xc = Math.cos(rotation.x);
  let xs = Math.sin(rotation.x);
  let yc = Math.cos(rotation.y);
  let ys = Math.sin(rotation.y);
  let zc = Math.cos(rotation.z);
  let zs = Math.sin(rotation.z);
  let tx = translation.x;
  let ty = translation.y;
  let tz = translation.z;
  let M:Matrix = new Matrix(4,4);
  M.A = new Float32Array([  zc*yc+(-zs)*(-xs)*(-ys), (-zs)*xc, zc*ys+(-zs)*(-xs)*yc,  0,
                            zs*yc+zc*(-xs)*(-ys),        zc*xc, zs*ys+zc*(-xs)*yc,    0,
                            xc*(-ys),                       xs, xc*yc,                0,
                            tx,                             ty, tz,                   1]);


//    M.A = new Float32Array( [ yc*zc, yc*(-zs), ys, 0,
//  (-xs)*(-ys)*zc+xc*zs, (-xs)*(-ys)*(-zs)+xc*zc, (-xs)*yc, 0,
//  xc*(-ys)*zc+xs*zs, xc*(-ys)*(-zs)+xs*zc, xc*yc, 0,
//  tx*yc+ty*(-xs)+tz*xc*(-ys)*zc+ty*xc+tz*xs*zs, tx*yc+ty*(-xs)+tz*xc*(-ys)*(-zs)+ty*xc+tz*xs*zc, tx*ys+ty*(-xs)+tz*xc*yc, 0]);
  return M;
}


function getViewTransform(focalLength:number, aspectRatio:number, nearPlane:number, farPlane:number){
  let V = new Matrix(4,4);    
  V.set(0,0, focalLength/36);
  V.set(1,1, aspectRatio * focalLength/36);
  V.set(2,2,(farPlane+nearPlane)/(nearPlane-farPlane));
  V.set(2,3,-1);
  V.set(3,2,(2*farPlane*nearPlane)/(nearPlane-farPlane));  
  return V;
}