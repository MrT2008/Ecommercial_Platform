import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Calculate the target date if provided, or use a default one
    const target = targetDate ? new Date(targetDate) : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
    
    const calculateTimeLeft = () => {
      const difference = target - new Date();
      
      if (difference <= 0) {
        return { days: '00', hours: '00', minutes: '00', seconds: '00' };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return {
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <div className="flex items-center">
      <div className="text-4xl font-bold mr-8">Flash Sales</div>
      <div className="flex items-center text-2xl">
        <div className="text-center">
          <div className="font-light text-sm">Days</div>
          <div className="font-bold text-4xl">{timeLeft.days}</div>
        </div>
        
        <div className="mx-2 text-4xl text-red-500">:</div>
        
        <div className="text-center">
          <div className="font-light text-sm">Hours</div>
          <div className="font-bold text-4xl">{timeLeft.hours}</div>
        </div>
        
        <div className="mx-2 text-4xl text-red-500">:</div>
        
        <div className="text-center">
          <div className="font-light text-sm">Minutes</div>
          <div className="font-bold text-4xl">{timeLeft.minutes}</div>
        </div>
        
        <div className="mx-2 text-4xl text-red-500">:</div>
        
        <div className="text-center">
          <div className="font-light text-sm">Seconds</div>
          <div className="font-bold text-4xl">{timeLeft.seconds}</div>
        </div>
      </div>
    </div>
  );
};

CountdownTimer.propTypes = {
  targetDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ])
};

export default CountdownTimer;