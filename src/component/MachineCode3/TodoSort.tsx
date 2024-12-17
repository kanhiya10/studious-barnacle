import React, { useState,useRef,useEffect } from 'react'
import './TodoSort.css';
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { FcAlphabeticalSortingZa } from "react-icons/fc";
import { IoFilterSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

type List=({
   
    handleSort:(args:string)=>void;
    handleDisableSort:(args:void)=>void;
})

interface Sort{
  toggle:boolean;
  orderType:string;
}

 const TodoSort:React.FC<List>=({handleSort,handleDisableSort})=>{
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
        <div ref={DropDownRef} className='dropdown-container'>
        <button className="btn" onClick={handleDropdown}><span><IoFilterSharp color='black' size={20}/></span>Filter</button>

        {isDropdownOpen &&(
            <ul  className='dropdown-menu'>
                <li onClick={()=>handleSorting('Ascending')}>
                    <FcAlphabeticalSortingAz/>
                    <span>Ascending</span>
                </li>
                <li onClick={()=>handleSorting('Descending')}>
                <FcAlphabeticalSortingZa/>
                <span>Descending</span>
                </li>
            </ul>
        )}

        {
          sortToggle.toggle && (
            <div className='dropdown-info'>
              <span>{sortToggle.orderType}</span>
              <span className='cancel'><MdCancel color='black' size={20} onClick={()=>{
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
export default TodoSort

