import React, { useState, useEffect, useRef } from 'react';
import './stopwatch.css';

const Stopwatch = () => {
    const [count, setCount] = useState<number>(0); // Track time in seconds
    const [laps, setLaps] = useState<number[]>([]); // Array to store lap times
    const CounterRef = useRef<NodeJS.Timeout | null>(null);

    // Load laps from local storage when the component mounts
    useEffect(() => {
        const storedLaps = localStorage.getItem('laps');
        if (storedLaps) {
            setLaps(JSON.parse(storedLaps));
        }
    }, []);

    // Function to start incrementing the stopwatch
    const increment = () => {
        if (CounterRef.current === null) {
            CounterRef.current = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);
        }
    };

    // Function to stop the stopwatch
    const handleStop = () => {
        if (CounterRef.current) {
            clearInterval(CounterRef.current);
            CounterRef.current = null;
        }
    };

    // Function to reset the stopwatch and clear laps
    const handleReset = () => {
        if (CounterRef.current) {
            clearInterval(CounterRef.current);
            CounterRef.current = null;
        }
        setCount(0); // Reset count to 0
        setLaps([]); // Clear laps
        localStorage.removeItem('laps'); // Remove laps from local storage
    };

    // Function to capture a lap
    const handleLap = () => {
        const newLaps = [...laps, count]; // Store the current time as a lap
        setLaps(newLaps);
        localStorage.setItem('laps', JSON.stringify(newLaps)); // Save laps to local storage
    };

    // Function to delete a specific lap
    const handleDeleteLap = (index: number) => {
        const newLaps = laps.filter((_, i) => i !== index); // Remove the lap at the given index
        setLaps(newLaps);
        localStorage.setItem('laps', JSON.stringify(newLaps)); // Update laps in local storage
    };

    // Function to format the count into mm:ss or hh:mm:ss format
    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        // Format time components to always have two digits
        const formattedHours = hours > 0 ? `${hours}:` : '';
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    };

    // Optional: Reset the counter on unmount
    useEffect(() => {
        return () => {
            if (CounterRef.current) {
                clearInterval(CounterRef.current);
            }
        };
    }, []);

    return (
        <div>
            <h1>Stopwatch</h1>
            <div>
                <h1>{formatTime(count)}</h1>
            </div>
            <button className='start' onClick={increment}>Start</button>
            <button className='stop' onClick={handleStop}>Stop</button>
            <button className='reset' onClick={handleReset}>Reset</button>
            <button className='lap' onClick={handleLap}>Lap</button>

            <div>
                <h2>Laps</h2>
                <ul>
                    {laps.map((lap, index) => (
                        <li key={index}>
                            {formatTime(lap)}
                            <button onClick={() => handleDeleteLap(index)} className="delete-lap">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stopwatch;
