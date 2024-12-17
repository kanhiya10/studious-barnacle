import React,{useState} from 'react'

function PracProps3() {
    const [arr,setArr]=useState<number[]>([]);

    const update=()=>{

    }

    const edit=()=>{

    }
    
    const Delete=()=>{

    }

  return (
    <div>
      <h1>PracProps3</h1>
      <div>
        <button onClick={()=>update}>Update the array</button>
        <button onClick={()=>edit}>Update the array</button>
        <button onClick={()=>Delete}>Update the array</button>
      </div>
    </div>
  )
}
export default PracProps3;