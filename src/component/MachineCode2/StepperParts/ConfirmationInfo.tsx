import React from 'react'

type MyProp=({
  // StepperDataId: number; 
  handleContent:()=>void;
})

const ConfirmationInfo:React.FC<MyProp>=({handleContent}) =>{
  return (
    <div>
      Confirmation Info
      <button style={{height:'30px',width:'90px',backgroundColor:'black',color:'white',marginLeft:20}} onClick={()=>handleContent()}>submit</button>
    </div>
  )
}
export default ConfirmationInfo;