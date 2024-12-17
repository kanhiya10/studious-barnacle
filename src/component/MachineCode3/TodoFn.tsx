import React, { useState, useEffect, Key } from 'react';
import './TodoFn.css';
import CompleteTask from '../../image/Complete.png';
import TodoFooter from './TodoFooter';
import TodoPriority from './TodoPriority';
import TodoTime from './TodoTime';
import TodoSort from './TodoSort';
import { GiCrossMark } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";

type MyProps=({
  CompletedTask:string[];
  setCompletedTask:(args:string[])=>void
})


type TopicStructure = {
  name: string;
  priority: string;
  sortingType?:string;
};

type Priority = "High" | "Medium" | "Low";

const PriorityColor:{[key in Priority] : string}={
  'High':'red',
  'Medium':'goldenrod',
  'Low':'green',
}


 const TodoFn:React.FC<MyProps>=({CompletedTask,setCompletedTask}) =>{

  const [isEditing, setIsEditing] = useState<boolean[]>([]);
  const [val, setVal] = useState<string>('');
  const [items, setItems] = useState<TopicStructure[]>([]);
  const [topic, setTopic] = useState<TopicStructure>({ name: '', priority: '' });
  const [searchList, setSearchList] = useState<TopicStructure[]>([]);
  const [priorityToggle, setPriorityToggle] = useState<boolean>(false);
  const [currentList, setCurrentList] = useState<TopicStructure[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortedList, setSortedList] = useState<TopicStructure[]>([]);
  const [currArray, setCurrArray] = useState<TopicStructure[]>([]);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    const listItem = searchList.length > 0 ? searchList : sortedList.length > 0 ? sortedList : items;
    setCurrArray(listItem.slice(startIndex, Math.min(endIndex, items.length)));
  }, [startIndex, endIndex, currentPage, searchList, items, sortedList]);

  const handleAddTodo = () => {
    if (topic.name) {
      setPriorityToggle(true); // Show priority options when a task is added
    }
  };

  const handleAddPriority = (priority: string) => {
    // Add the task with priority
    const newItem = { name: topic.name, priority };
    setItems([...items, newItem]);
    setPriorityToggle(false); // Hide priority options after selection
    setTopic({ name: '', priority: '' }); // Reset topic input
    setSearchList([]); // Reset search
  };

  console.log(items);

  const handleDelete = (eachItem: TopicStructure) => {
    setCompletedTask([...CompletedTask,eachItem.name])
    setItems(items.filter(item => item.name !== eachItem.name)); // Correct deletion by comparing name
  };

  const handleEdit = (index: number) => {
    setVal(items[index].name);
    setIsEditing([...isEditing.slice(0, index), true, ...isEditing.slice(index + 1)]);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, eachItem: TopicStructure, index: number) => {
    if (e.key === 'Enter') {
      setItems(items.map((item, idx) => idx === index ? { ...item, name: val } : item));
      setIsEditing([...isEditing.slice(0, index), false, ...isEditing.slice(index + 1)]);
      setVal('');
    }
  };

  const handleSort = (sortingWay: string): void => {
    if (['Ascending', 'Descending'].includes(sortingWay)) {
      const sortedArray = [...items].sort((a, b) => {
        if (a.name < b.name) return sortingWay === 'Ascending' ? -1 : 1;
        if (a.name > b.name) return sortingWay === 'Ascending' ? 1 : -1;
        return 0;
      });
      setSortedList(sortedArray.map((perItem)=>({...perItem,
        sortingType:'Filter'
      })));
    }  else {
      const priorityOrder: { [key in Priority]: number } = {
        High: sortingWay==='High'?1:3,
        Medium: 2,
        Low: sortingWay==='High'?3:1,
      };
   
  const sortedArray = [...items].sort((a, b) => {
    return priorityOrder[a.priority as Priority] - priorityOrder[b.priority as Priority];
  });

  console.log('sortedArray',sortedArray);
  setSortedList(sortedArray.map((perItem)=>({...perItem,
    sortingType:'Priority'
  })));
}
  };
  console.log(sortedList);
  

  const handleDisableSort = () => {
    setSortedList([]);
  };

  const handleSearch = (char: string) => {
    const searchResult = items.filter(item => item.name.includes(char));
    setSearchList(searchResult);
  };

  return (
    <div>
      <div style={{marginTop: '30px', marginBottom: '30px' }}>
        <div className='boxAnimate1'>
          <input
            type="text"
            value={topic.name}
            className='boxInput'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleSearch(e.target.value);
              setTopic({ name: e.target.value, priority: '' });
            }}
            required
          />
          <label>Add your task</label>
        </div>
        <button
          style={{
            height: 40,
            width: 70,
            marginLeft: 10,
            cursor: 'pointer',
            backgroundColor: 'navajowhite',
            borderRadius: 10
          }}
          onClick={handleAddTodo}
        >
          Add
        </button>

        {priorityToggle && (
          <div>
            <button style={{cursor:'pointer',backgroundColor:'#FA8072'}} onClick={() => handleAddPriority('High')}>High Priority</button>
            <button style={{cursor:'pointer',backgroundColor:'#FFFFE0'}} onClick={() => handleAddPriority('Medium')}>Medium Priority</button>
            <button style={{cursor:'pointer',backgroundColor:'#00FA9A'}} onClick={() => handleAddPriority('Low')}>Low Priority</button>
          </div>
        )}
      </div>

      <div className="sortContainer">
        <TodoSort handleSort={handleSort} handleDisableSort={handleDisableSort} />
        <TodoPriority  handleSort={handleSort} handleDisableSort={handleDisableSort}/>
      </div>

      <div style={{ height: 250, marginBottom: 20, backgroundColor: '#B0E0E6' }}>
        {currArray.length > 0 ? (
          <div>
            <ul>
              <li style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
                <span style={{ textDecoration: 'underline' }}>Task</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: 250, marginLeft: 80 }}>
                  <span style={{ marginLeft: 25, textDecoration: 'underline' }}>Timer</span>
                  <span style={{ marginRight: 15, textDecoration: 'underline' }}>Edit</span>
                  <span style={{ textDecoration: 'underline' }}>Completed</span>
                </div>
              </li>
              {currArray.map((eachItem, index) => (
                <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', position: 'relative' }}>
                  {isEditing[index] ? (
                    <>
                      <input
                        style={{ marginLeft: 40 }}
                        type="text"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        onKeyDown={(e) => handleEnter(e, eachItem, index)}
                      />
                      <span style={{ marginRight: '60px' }}>
                        <img  src={CompleteTask} style={{height:32,width:32}} onClick={() => handleDelete(eachItem)} />
                      </span>
                    </>
                  ) : (
                    <>
                    {console.log('eachItem.sortingType',eachItem.sortingType)}

                      <span className="spanUpper" style={{ color:
      eachItem.sortingType === 'Priority' ? PriorityColor[eachItem.priority as  Priority] : 'black' 
       ,fontWeight: 'bold', fontSize: '22px', marginLeft: 40 }}>{eachItem.name}</span>

                      <span style={{ position: 'absolute', right: 240 }}>
                        <TodoTime id={index} />
                      </span>
                      <span style={{ position: 'absolute', right: 160 }}>
                        <FaRegEdit color="green" size={30} onClick={() => handleEdit(index)} />
                      </span>
                      <span style={{ marginRight: '60px' }}>
                      <img  src={CompleteTask} style={{height:32,width:32}} onClick={() => handleDelete(eachItem)} />
                      </span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <h1>Result not found</h1>
        )}
      </div>

      {items.length > 0 && (
        <div>
          <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center',marginRight:20 }}>
            {Array.from({ length: 1 }, (_, i) => (
              <li key={i} className='paginateBtn'>
                <button className="previousBtn" onClick={() => currentPage - 1 >= 0 && setCurrentPage(currentPage - 1)}>previous</button>
                <button className="currentBtn">{currentPage}</button>
                <button className="nextBtn" onClick={() => currentPage < Math.floor(items.length / itemsPerPage) && setCurrentPage(currentPage + 1)}>next</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default TodoFn;







// import React, { useState, useContext, useEffect } from 'react';
// import './TodoFn.css';
// import TodoFooter from './TodoFooter';
// import TodoTime from './TodoTime';
// import TodoSort from './TodoSort';
// import { GiCrossMark } from "react-icons/gi";
// import { FaRegEdit } from "react-icons/fa";

// export default function TodoFn() {

//   const [isEditing, setIsEdit] = useState<boolean[]>([]);
//   const [val, setVal] = useState<string>('')
//   const [items, setItems] = useState<string[]>([]);
//   const [topic, setTopic] = useState<string>('');

//   const[searchList,setSearchList]=useState<string[]>([]);
  
//   const[currentList,setCurrentList]=useState<string[]>([]);


//   const [itemsPerPage, setItemsPerPage] = useState<number>(5);
//   const [currentPage, setCurrentPage] = useState<number>(0);
//   const[sortedList,setSortedList]=useState<string[]>([]);
//   const [currArray, setCurrArray] = useState<string[]>([]);
//   const startIndex = currentPage * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;



//   useEffect(() => {
   
//     const listItem=searchList.length>0?searchList:(sortedList.length>0?sortedList:items);
    
//       setCurrArray(listItem.slice(startIndex, Math.min(endIndex, items.length)))
      
    
    
//   }, [startIndex, endIndex,currentPage,searchList,items,sortedList])


//   const handleAddTodo = () => {
//     if (topic) {
//       console.log('added');
//       setItems([...items, topic]);
//       setIsEdit([...isEditing, false]);
//       setTopic('');
//       setSearchList([]);
//     }

//   }

//   console.log(items);

//   const handleDelete = (eachItem: string) => {
//     setItems(items.filter((perItem) => eachItem !== perItem));
//   }
//   const handleEdit = (index: number) => {
//     setVal(items[index]);
//     setIsEdit([...isEditing.slice(0, index), true, ...isEditing.slice(index + 1)])

//   }
//   const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, eachItem: string, index: number) => {
//     const key = e.key;
//     if (key === 'Enter') {
//       setItems(items.map((perItem, idx) => {
//         return idx === index ? val : perItem;
//       }))
//       setIsEdit([...isEditing.slice(0, index), false, ...isEditing.slice(index + 1)])
//       setVal('');
//     }
//   }

//   const handleSort=(sortingWay:string):void=>{

 
//   const sortedArray=[...items].sort((a,b)=>{
//     if(a<b){
//       return sortingWay==='Ascending'?-1:1
//     }
//     else if(a>b){
//       return sortingWay==='Ascending'?1:-1
//     }
//     else{
//       return 0;
//     }
//   })

//   console.log('items sorted',items);

//   console.log('sorted array',sortedArray);

//   // setCurrArray(sortedArray);
//   setSortedList(sortedArray);

//   }

//   const handleDisableSort=()=>{
//     setSortedList([]);
//   }

//   const handleSearch=(char:string)=>{
//     const serachResult=[...items].filter((eachItem)=>eachItem.includes(char));
//     serachResult.length>0?setSearchList(serachResult):setCurrArray([]);
    
//   }




//   return (
//     <div>
//       <div style={{ marginTop: '30px', marginBottom: '30px' }}>

//         <div className='boxAnimate1'>
//           <input type="text" value={topic} className='boxInput' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//             handleSearch(e.target.value)
//             setTopic(e.target.value)}
//             } required></input>
//           <label>Add your task</label>

//         </div>
//         <button style={{ height: 40, width: 70, marginLeft: 10, cursor: 'pointer', backgroundColor: 'navajowhite', borderRadius: 10 }} onClick={() => handleAddTodo()}>Add</button>
//       </div>

//       <div style={{ height: 40, marginBottom: 30, }}>
//         <TodoSort  handleSort={handleSort} handleDisableSort={handleDisableSort}/>
//       </div>

//       <div style={{ height: 250, marginBottom: 20,backgroundColor:'oldlace' }}>
//         {
//           currArray.length > 0 ? (
//             <div>
//               <ul>

//               <li  style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
//                 <span style={{textDecoration:'underline'}}> Task </span>
//                 <div style={{display: 'flex', justifyContent: 'space-between',width:250,marginLeft:80}}>
//                 <span style={{marginLeft:25,textDecoration:'underline'}}> Timer</span>
//                 <span style={{marginRight:15,textDecoration:'underline'}}>Edit</span>
//                 <span style={{textDecoration:'underline'}}>Delete</span>
//                 </div>
//               </li>

//                 {currArray.map((eachItem: string, index) => (

//                   <li key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', position: 'relative' }}>
//                     {isEditing[index] ? (
//                       <>
//                         <input
//                           style={{ marginLeft: 40 }}
//                           type="text"
//                           value={val}
//                           onChange={(e) => setVal(e.target.value)}
//                           onKeyDown={(e) => handleEnter(e, eachItem, index)}
//                         />
//                         <span style={{ marginRight: '60px' }}>
//                           <GiCrossMark color="pink" size={30} onClick={() => handleDelete(eachItem)} />
//                         </span>
//                       </>
//                     ) : (
//                       <>
//                         <span className="spanUpper" style={{ fontWeight: 'bold', fontSize: '22px', marginLeft: 40 }}>{eachItem}</span>
//                         <span style={{ position: 'absolute', right: 240 }}>
//                           <TodoTime id={index} />
//                         </span>

//                         <span style={{ position: 'absolute', right: 160 }}>
//                           <FaRegEdit color="lightblue" size={30} onClick={() => handleEdit(index)} />
//                         </span>
//                         <span style={{ marginRight: '60px' }}>
//                           <GiCrossMark color="pink" size={30} onClick={() => handleDelete(eachItem)} />
//                         </span>

//                       </>
//                     )}
//                   </li>

//                 ))}
//               </ul>
//             </div>
//           ):(
//             <h1>Result not found</h1>
//           )
//         }
//       </div>

//       {items.length > 0 && (

//         <div>
//           <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'center' }}>
//             {
//               Array.from({ length: 1 }, (_, i) => (
//                 <li key={i} className='paginateBtn'>
//                   <button className="previousBtn" onClick={() => currentPage - 1 >= 0 && setCurrentPage(currentPage - 1)}>previous</button>
//                   <button className="currentBtn">{currentPage}</button>
//                   <button className="nextBtn" onClick={() => currentPage < Math.floor(items.length / itemsPerPage) && setCurrentPage(currentPage + 1)}>next</button>
//                 </li>
//               ))
//             }
//           </ul>

//         </div>

//       )
//       }



//     </div>
//   )
// }



