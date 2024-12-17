import React from 'react';
import "./square.css";

interface SquareProps {
    value: string | null;
    update: () => void;
}

function Square({ value, update }: SquareProps) {
    return (
        <div className='square' onClick={update}>
            {value}
        </div>
    );
}

export default Square;
