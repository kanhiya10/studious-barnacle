import { useState } from 'react';
import "./typeAhead.css";
import TypeAhead from './typeAhead';

function Header() {
  const[val,setVal]=useState('');

  return (
  <div>
   <div style={{height:'100px',backgroundColor:'white',display:'flex',justifyContent:'space-between',alignItems:'center',border:'2px solid black',padding: '0px 20px'}}>
    <div>
    <h1 style={{fontSize:'24px',fontWeight:'bold',color:'black',margin:'0'}}>Header</h1>
    </div>
    <div>
        <TypeAhead/>
    </div>
   </div>
  </div>
  )
}

export default Header;