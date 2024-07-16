import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1); // Increment seconds by 1
        }, 1000); // Execute every 1000 ms (1 second)

        return () => clearInterval(interval); // Cleanup function to clearInterval on unmount
    }, []); // Empty dependency array ensures it runs only once on mount

    return (
        <div>
            <h1>Timer: {seconds} seconds</h1>
        </div>
    );
};

export default TimerComponent;
