/// <reference path="matrix.ts" />

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  if (canvas.width  !== displayWidth ||
      canvas.height !== displayHeight) {
 
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}


function testMatrixMath(){
  let rZ:string[]=['zc' ,'(-zs)', '0', '0',
                    'zs' , 'zc', '0', '0',
                     '0' ,'0'  , '1', '0',
                     '0' ,'0'  , '0', '1' ];
    let rX:string[]=[ '1' ,'0'  , '0', '0',
                     '0' , 'xc','(-xs)', '0',
                     '0' , 'xs', 'xc', '0',
                     '0' , '0' ,  '0', '1' ];
                     
    let rY:string[]=[ 'yc' , '0'  , 'ys', '0',
                      '0'  , '1'  ,  '0', '0',
                      '(-ys)', '0', 'yc', '0',
                      '0'  , '0'  ,  '0', '1' ];

    let trans:string[]=['1' ,'0', '0', '0',
                        '0' ,'1', '0', '0',
                        '0' ,'0', '1', '0',
                        'tx' ,'ty', 'tz', '1' ];


    let C:string[]=[''];    
    C = mulTextMatrix4(trans,rX);  
    C = mulTextMatrix4(C,rY);    
    C = mulTextMatrix4(C,rZ);    
    document.getElementById("text").innerHTML = printTextMatrix4(rZ) + "<br><B>testMatrix:</B><p>" + printTextMatrix4(C) + "</p>";
}

// Function to download data to a file
function downloadDataToFile(data, filename, type) {
    let file = new Blob([data], {type: type});   
    let a = document.createElement("a"),
            url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0);    
}

function mulTextMatrix4(A:string[],B:string[])
{
  let C:string[]=Array(16);
              let i=0;
              for(let r=0; r<4; r++){                
                for(let c=0;c < 4; c++){
                  let empty:Boolean = true;                        
                  C[i]="";
                    for(let j=0; j<4;j++){
                        let a = A[4*r+j];
                        let b = B[4*j+c];                        
                        if(a!="0" && b!="0") {
                          if(!empty) C[i]+="+";                          
                          if(a=="1") C[i]+=b;
                          else if (b=="1") C[i]+=a;
                          else C[i]+=a + '*' + b;
                          empty = false;                          
                        }                                              
                    }
                    if(empty) C[i]="0";
                    i++;                 
                }
            }
            return C;
}

function printTextMatrix4(A:string[]){
        let str:string="[ ";        
        let i=0;
        for( let v of A){            
            i++;
            str+=v;            
            if( (i%4) == 0) {
              if(i!=A.length)
                str+=",<br>";
            }
            else str+=", ";        
        }
        str+="]";
                
        return str;
}

/*
   function frameBufferIsComplete()
    {
      var message;
      var status;
      var value;

      status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);

      switch (status)
      {
        case this.gl.FRAMEBUFFER_COMPLETE:
          value = true;
          break;
        case this.gl.FRAMEBUFFER_UNSUPPORTED:
          message = "Framebuffer is unsupported";
          value = false;
          break;
        case this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
          message = "Framebuffer incomplete attachment";
          value = false;
          break;
        case this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
          message = "Framebuffer incomplete (missmatched) dimensions";
          value = false;
          break;
        case this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
          message = "Framebuffer incomplete missing attachment";
          value = false;
          break;
        default:
          message = "Unexpected framebuffer status: " + status;
          value = false;
      }
      return {isComplete: value, message: message};  
  }
*/