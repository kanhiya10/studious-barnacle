import React from 'react'


interface Myprop{
    handleAdd:(arg:void)=>void
}

 const PracProps1:React.FC<Myprop>=(props)=> {
    const{handleAdd}=props;
  return (
    <div>
      <button onClick={()=>handleAdd()}>Add row</button>
    </div>
  )
}
export default PracProps1;