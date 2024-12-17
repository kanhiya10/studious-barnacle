import React, { useEffect, useState } from 'react';
import Square from './square';
import "./ticTac.css";

function TicTac() {
    type TrackerItem={
        xTrack:number[];
        oTrack:number[];
    }

    type historyTracker={
        [key:number]:(string | null)[][];
    }

    const [turn, setTurn] = useState<string>('X');
    const [tracker,setTracker]=useState<TrackerItem>();
    const[history,setHistory]=useState<historyTracker>({
        0:Array.from({ length: 3 }, () => Array(3).fill(null))
    });
    const[prevMoves,setMove]=useState<number | null>(null);

    const [board, setBoard] = useState<(string | null)[][]>(Array.from({ length: 3 }, () => Array(3).fill(null)));

    const calculateWinner=(tracker:TrackerItem):string | null=>{
     const winningCombination=   [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    console.log(tracker);

    for(let i=0;i<winningCombination.length;i++){
        // let[a,b,c]=winningCombination[i];
       const Xwinner= winningCombination[i].every(element=>tracker?.xTrack.includes(element))

       const Owinner= winningCombination[i].every(element=>tracker?.oTrack.includes(element))

     if(Xwinner){
        return 'X';
       }
     else if(Owinner){
        return 'O';
       }
    }
    return null;
    }

    const update = (row: number, col: number): void=> {
      
        if (board[row][col] === null ) {
            const newBoard = board.map((r, i) => r.map((cell, j) => (i === row && j === col ? turn : cell)));
            setBoard(newBoard);
            const newKey=Object.keys(history).length;
            setHistory((prevHistory)=>({...prevHistory,
                [newKey]:newBoard
               }));
            
            console.log("line 63",history);
            // if(turn==='X'){
            //     const move=3*row+col;
               
            //     setTracker((prevTacker)=>({...prevTacker,
            //         xTrack:[...(prevTacker?.xTrack)||[],move],
            //         oTrack:[...(prevTacker?.oTrack)||[]]
            //     }));
            // }
            // else{
            //     const move=3*row+col;
            //     setTracker((prevTacker)=>({...prevTacker,
            //         xTrack:[...(prevTacker?.xTrack)||[]],
            //         oTrack:[...(prevTacker?.oTrack)||[],move]
            //     }));
            // }
            //using this winner will be declared on 1 next move after winning because hook does not update immediately (batching)
            // therefore when calculate fn is called on the next move then the winner is declared

            

            // const winner=calculateWinner();
            // if(winner){
            //     alert(`${winner} wins!`); 
            //     // console.log(winner,"wins");
          
            //     resetGame();
            // }
            

            const move=3*row+col;

            setTracker((prevTracker)=>{
                const recentTracker={
                    xTrack:turn==='X'?[...(prevTracker?.xTrack)||[],move]:[...(prevTracker?.xTrack)||[]],
                    oTrack:turn==='O'?[...(prevTracker?.oTrack)||[],move]:[...(prevTracker?.oTrack)||[]],
                }
                
            

            const winner=calculateWinner(recentTracker);
            if(winner){
                alert(`${winner} wins!`); 
                // console.log(winner,"wins");
          
                resetGame();
            }
            return recentTracker;
        }
            )

            // const move=3*row+col;

            // setTracker((prevTracker)=>({
            //         xTrack:turn==='X'?[...(prevTracker?.xTrack)||[],move]:[...(prevTracker?.xTrack)||[]],
            //         oTrack:turn==='O'?[...(prevTracker?.oTrack)||[],move]:[...(prevTracker?.oTrack)||[]],
                
            // }))

            
            setTurn(turn === 'X' ? 'O' : 'X');
            prevMoves && checkMove();
        }

        
    }

    const checkMove=():void | null=>{
        if(prevMoves===(Object.keys(history).length-1)){
            return null;
        }
        else if(prevMoves===null){
            return null;
        }
        const newHistory=Object.keys(history).slice(0,prevMoves+1).reduce((acc:historyTracker,current:string)=>{
            acc[parseInt(current)]=history[parseInt(current)]
            return acc;
        },{});
        setHistory(newHistory);
        setMove(null);
        // return resetGame();
    }

    // const handleHistory=(index:number):void=>{
    //     setBoard(history[index]);
        // checkMove(index);
     
    //     console.log("history index",history[index]);
        
    // }

    const resetGame=()=>{
        setBoard(Array.from(({length:3}),(_,i)=>Array(3).fill(null)))
        setTracker({
            xTrack:[],oTrack:[]
        });
        setTurn('X')
    }

    return  (
        <div className="tic-tac-container">
              <h1>Tic Tac Toe</h1>
              <div className="board">
                  {board.map((row, rowIndex) => (
                      <div key={rowIndex} className='block'>
                          {row.map((val, colIndex) => (
                              <Square key={colIndex} update={() => update(rowIndex, colIndex)} value={val} />
                          ))}
                      </div>
                  ))}
              </div>
              <div className="history">
                  <h1>History</h1>
                  {
                      Object.keys(history).length > 0 && (
                          <>
                          {
                              Object.values(history).map((item, index) => (
                                  <button key={index} onClick={() => {
                                      setBoard(history[index]);
                                      setMove(index);
                                  }}>
                                      {index === 0 ? "Go to game start" : `Go to move #${index}`}
                                  </button>
                              ))
                          }
                          </>
                      )
                  }
              </div>
        </div>
      );
}

export default TicTac;
