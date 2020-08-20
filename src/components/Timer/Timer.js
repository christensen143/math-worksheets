import React, { useEffect, useState } from 'react';

import './Timer.css';

const Timer = ({ isActive, setIsActive, markWrong, dispatch }) => {
  const [seconds, setSeconds] = useState(70);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
      if (seconds <= 5) {
        document.getElementById('timer').className = 'hurry';
      }
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsActive(false);
      dispatch({ type: 'SET_TIMEOUT', timeout: true });
    }
    return () => clearInterval(interval);
  }, [isActive, setIsActive, seconds, markWrong, dispatch]);

  return <div id="timer">Timer: {seconds}s</div>;
};

export default Timer;
