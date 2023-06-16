import React, { useState, useEffect } from 'react';

const DraggableBox = ({ id, initialPosition, locked, handleDrag }) => {
    const [position, setPosition] = useState(initialPosition);

    useEffect(() => {
        if (locked) {
            // Save position to localStorage when locked
            localStorage.setItem(`box-${id}-position`, JSON.stringify(position));
        }
    }, [id, locked, position]);

    const handleDragStart = (event) => {
        if (locked) {
            event.preventDefault();
            return;
        }
        const initialX = event.clientX - position.x;
        const initialY = event.clientY - position.y;
        const handleDragMove = (event) => {
            const x = event.clientX - initialX;
            const y = event.clientY - initialY;
            setPosition({ x, y });
            handleDrag(id, { x, y });
        };
        const handleDragEnd = () => {
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                width: '100px',
                height: '100px',
                background: 'red',
                cursor: locked ? 'default' : 'move',
            }}
            draggable={!locked}
            onDragStart={handleDragStart}
        />
    );
};

const ToggleDraggableBox = () => {
    const [boxes, setBoxes] = useState([]);
    const [locked, setLocked] = useState(false);

    useEffect(() => {
        // Load box positions from localStorage
        const storedBoxes = JSON.parse(localStorage.getItem('boxes') || '[]');
        setBoxes(storedBoxes);
    }, []);

    const handleDrag = (id, newPosition) => {
        setBoxes((prevBoxes) => {
            const updatedBoxes = prevBoxes.map((box) =>
                box.id === id ? { ...box, position: newPosition } : box
            );
            return updatedBoxes;
        });
    };

    const handleToggle = () => {
        setLocked((prevLocked) => {
            if (!prevLocked) {
                // Save box positions to localStorage when locking
                localStorage.setItem('boxes', JSON.stringify(boxes));
            } else {
                // Remove box positions from localStorage when unlocking
                localStorage.removeItem('boxes');
            }
            return !prevLocked;
        });
    };

    const handleReset = () => {
        localStorage.removeItem('boxes');
        setBoxes([]);
        setLocked(false);
    };

    const handleAddBox = () => {
        const newBox = { id: Date.now(), position: { x: 50, y: 50 } };
        setBoxes((prevBoxes) => [...prevBoxes, newBox]);
    };

    return (
        <div>
            <button onClick={handleToggle}>{locked ? 'Unlock' : 'Lock'}</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleAddBox}>Add Box</button>
            {boxes.map((box) => (
                <DraggableBox
                    key={box.id}
                    id={box.id}
                    initialPosition={box.position}
                    locked={locked}
                    handleDrag={handleDrag}
                />
            ))}
        </div>
    );
};

export default ToggleDraggableBox;
