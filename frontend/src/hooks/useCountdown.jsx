import { useState, useEffect, useCallback } from 'react';

const useCountdown = (initialTime = 300) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = useCallback((time = initialTime) => {
    setTimeLeft(time);
    setIsRunning(true);
  }, [initialTime]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetTimer = useCallback((time = initialTime) => {
    setTimeLeft(time);
    setIsRunning(true);
  }, [initialTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    isExpired: timeLeft === 0,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

export default useCountdown;