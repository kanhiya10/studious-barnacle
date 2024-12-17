import React,{useState} from "react";

function AsyncPrac() {

    const [number, setNumber] = useState(0);
 
  
    return (
      <div>
             <h1>{number}</h1>
        <button onClick={() => {
            setNumber(n => number + 1);
       
          alert(number);
          setNumber(number + 5);
          setTimeout(()=>{
            setNumber(n => n + 1);
          setNumber(n => n + 5);
          },3000)
          
        }}>Increase the number</button>
    
      </div>
    );
  };
  
  export default AsyncPrac;

//   the output is alert showing 0 and output 5 which changes to 11 after 3 sec because react takes snapshot at the time of render ,at the time of render