import React, { useState, useEffect } from 'react';

const ProgressBar = ({title, value}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Example: Simulate progress increase over time
    const intervalId = setInterval(() => {
      setProgress(prevProgress => value);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center space-x-2 justify-between w-full">
         <p>
            <strong>{title}:</strong>
          </p>
    <div className=" w-[80%] bg-gray-200 rounded-full h-2 border">
      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
    </div>
    </div>
  );
};

export default ProgressBar;