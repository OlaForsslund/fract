class Vector{
    x:number;
    y:number;
    z:number;
    w:number;
    
    constructor(x,y,z,w){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w;
    }
    set(x,y,z,w){
        this.x=x;
        this.y=y;
        this.z=z;
        this.w=w; 
    }
    mulN(n:number){        
        this.x*=n;
        this.y*=n;
        this.z*=n;
        this.w*=n;
        return this;        
    }    
    mulS(v:Vector){
        // Scalar multiplication
        this.x*=v.x;
        this.y*=v.y;
        this.z*=v.z;
        this.w*=v.w;
        return this;
    }
    addN(n:number){
        this.x+=n;
        this.y+=n;
        this.z+=n;
        this.w+=n;
        return this;
    }

    addV(v:Vector){
        this.x+=v.x;
        this.y+=v.y;
        this.z+=v.z;
        this.w+=v.w;
        return this;
    }    

    subV(v:Vector){
        this.x-=v.x;
        this.y-=v.y;
        this.z-=v.z;
        this.w-=v.w;
        return this;
    } 
    normalize(){
        let r = Math.sqrt(this.x*this.x + this.y*this.y+ this.z*this.z);
        this.x/=r;
        this.y/=r;
        this.z/=r;
        return this;
    }
    cross(v:Vector){        
        this.x = this.y*v.z - this.z*v.y;
        this.y = this.z*v.x - this.x*v.z;
        this.z = this.x*v.y - this.y*v.x;
        return this;
    }
    print(){
        return "( "+ this.x.toPrecision(4) + ", "+ this.y.toPrecision(4) + ", " +
                     this.z.toPrecision(4) + ", "+ this.w.toPrecision(4) +")";
    }
}