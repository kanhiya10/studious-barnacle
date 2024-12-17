import React,{useState} from 'react'

type MyProp=({
  // StepperDataId: number; 
  handleContent:()=>void;
})

 const PersonalInfo:React.FC<MyProp>=({handleContent})=> {
    const [info,setInfo]=useState('');

 
  return (
    <div>
      <input type='text' value={info} onChange={(e)=>setInfo(e.target.value)}/>
      <button style={{height:'30px',width:'90px',backgroundColor:'black',color:'white',marginLeft:20}} onClick={()=>handleContent()}>submit</button>
    </div>
  )
}

export default PersonalInfo;