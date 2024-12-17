import React, { useState,useRef,useEffect } from 'react'
import './TodoPriority.css';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { MdOutlineLowPriority } from "react-icons/md";
import { MdCancel } from "react-icons/md";

type List=({
   
    handleSort:(args:string)=>void;
    handleDisableSort:(args:void)=>void;
})

interface Sort{
  toggle:boolean;
  orderType:string;
}

 const TodoPriority:React.FC<List>=({handleSort,handleDisableSort})=>{
    const[sortOrder,setSortOrder]=useState<string>('');
    const[sortToggle,setSortToggle]=useState<Sort>({
      toggle:false,
      orderType:'',
    });
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const DropDownRef=useRef<HTMLDivElement | null>(null);


    useEffect(()=>{
      const handleClickEvent=(e:MouseEvent)=>{
        if(DropDownRef.current && !(DropDownRef.current.contains(e.target as Node))){
          setIsDropdownOpen(false);
        }
      }
      
    document.addEventListener('mousedown',handleClickEvent)
 
    return()=>document.removeEventListener('mousedown',handleClickEvent);
    },[DropDownRef])

  const handleDropdown=()=>{
    setIsDropdownOpen(!isDropdownOpen);
  }

  const handleSorting=(order:string)=>{
    handleSort(order);
    setSortToggle({
      toggle:true,
      orderType:order,
    });
  }


  return (
    <div>
        <div ref={DropDownRef} className='dropdowncontainer'>
        <button className="button" onClick={handleDropdown}><span><MdOutlineLowPriority color='black' size={20}/></span>Priority</button>

        {isDropdownOpen &&(
            <ul  className='dropdownmenu'>
                <li onClick={()=>handleSorting('High')}>
                  <FaArrowTrendDown/>
                    <span>High To Low</span>
                </li>

                <li onClick={()=>handleSorting('Low')}>
                  <FaArrowTrendUp/>
                <span>Low To High</span>
                </li>
            </ul>
        )}

        {
          sortToggle.toggle && (
            <div className='dropdowninfo'>
              <span>{sortToggle.orderType}</span>
              <span className='cross'><MdCancel color='black' size={20} onClick={()=>{
                setSortToggle({
                  toggle:false,
                  orderType:'',
                })
                handleDisableSort()}}/>
                </span>
              </div>
          )
        }
       </div>
    </div>
  )
}
export default TodoPriority;

