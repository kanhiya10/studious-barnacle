import React,{useState,useRef} from 'react'
import "./otp.css";

function OTP() {
    const OtpLength=6;

    type refStructure={
      // 'id':number;
      'expression':HTMLDivElement;
    }

    const inputref=useRef<refStructure[]>([]);

    const [currentNo,setCurrentNo]=useState<number>(-1);

    
    const newArray:number[] | null[] = Array.from({ length: OtpLength },()=>null);


    const handleNumerical=(e:React.KeyboardEvent<HTMLDivElement>,index:number)=>{
      const key=e.key;
      if (/^[0-9]$/.test(key)) {
        const target = e.currentTarget; // The parent div
        const child = target.querySelector('.child'); // Select the child element
        if (child) {
          child.textContent=key;
          if(inputref.current[index+1]){
            // inputref.current[index].expression.classList.remove('box:focus');
            inputref.current[index].expression.className='newbox';
          // inputref.current[index+1].expression.style.border="4px solid rgb(39, 100, 121)"; 
          inputref.current[index+1].expression.className='box';
          inputref.current[index+1].expression.focus(); 
          }
          
        }
      }
      else if(key==='Backspace' || key==='Delete'){
        const target=e.currentTarget;
        const child = target.querySelector('.child');
        if (child) {
          child.textContent=null;
          if(inputref.current[index-1]){
            // inputref.current[index].expression.classList.remove('box:focus');
            inputref.current[index].expression.className='newbox';
          // inputref.current[index+1].expression.style.border="4px solid rgb(39, 100, 121)"; 
          inputref.current[index-1].expression.className='box';
          inputref.current[index-1].expression.focus(); 
          }
          
        }
      }
    }
   

  return (
    <div >
    
   
      <div >
        {
            newArray.length>0 &&(
                <div className="container">
                    {newArray.map((item:number | null,index:number)=>(
                    <div onKeyDown={(e)=>handleNumerical(e,index)}  ref={(presentRef:HTMLDivElement)=>(inputref.current[index]={
                      'expression':presentRef
                    }
                    )}  className='box' key={index} tabIndex={0}>
                       <h1 className='child'>{item}</h1>
                    </div>
                    ))
}
                    </div>
                
            )
        }
        <h1 style={{fontSize:14,textDecoration:'underline',}}>Enter 6 digit OTP received on your number</h1>
      </div>
    </div>
  )
}

export default OTP;