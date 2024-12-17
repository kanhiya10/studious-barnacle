import React,{useState} from 'react'

 function PracReturn() {
   const[arr,setArr]=useState<number[]>([1,2,3,4,5])
   const newArray= arr.map((i,index)=>({
    index:(i*i)
})

)

const handleAdd=()=>{
    setArr([...arr,6])
}



  
  return (
    <div>
     {
        newArray.length>0 && (
            <>
      {newArray.map((item,index)=><div key={index}><h1>{item.index}</h1></div>)}
            </>
        )
     }
      <button onClick={handleAdd}>Add new element</button>
    </div>
  )
}

export default PracReturn;