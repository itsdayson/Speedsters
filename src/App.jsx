import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
// import './style.css';

const Speedster = () => {
  // State to store the input value
  const [nameValue, setNameValue] = useState('');
  const [minutesValue, setMinutesValue] = useState('');
  const [secondsValue, setSecondsValue] = useState('');
  //const [calculatedTime, setCalculatedTime] = useState(0);
  const [fiveK, setFiveK] = useState(null);
  const [tenK, setTenK] = useState(null);
  const [halfMarathon, setHalfMarathon] = useState(null);
  const [marathon, setMarathon] = useState(null);
  const [savedData, setSavedData] = useState([]);

  // Event handler to update the state when input changes
  const handleNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const handleMinutesValue = (e) => {
    setMinutesValue(e.target.value);
  };

  const handleSecondsValue = (e) =>{
    setSecondsValue(e.target.value);
  };

  const openStatsPage = () => {
    window.location.href = 'http://localhost:3000/stats';
  };

  const convertSecondsToTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = (totalSeconds % 60).toFixed(2);
  
    return {
      hours,
      remainingMinutes,
      remainingSeconds,
    };
  };

  const calculateTimeInSeconds = () => {
    const seconds = parseInt(minutesValue) * 60 + parseInt(secondsValue);
    const fiveK = seconds * 3.10686;
    const tenK = seconds * 6.21371;
    const halfMarathon = seconds * 13.1094;
    const marathon = seconds * 26.219;
    //setCalculatedTime(time);
    const fiveKTime = convertSecondsToTime(fiveK);
    const tenKTime = convertSecondsToTime(tenK);
    const halfMarathonTime = convertSecondsToTime(halfMarathon);
    const marathonTime = convertSecondsToTime(marathon);
    setFiveK(fiveKTime);
    setTenK(tenKTime);
    setHalfMarathon(halfMarathonTime);
    setMarathon(marathonTime);

    const dataToSave = {
      name: nameValue,
      fiveK: fiveK,
      tenK: tenK,
      halfMarathon: halfMarathon,
      marathon: marathon,
    };
  
    // Set the state to include the new data
    setSavedData((prevData) => [...prevData, dataToSave]);
  };

  const saveData = () => {
    // Save data to local storage
    const dataToSave = {
      name: `Name: ${nameValue}`,
      pace: `Pace: ${minutesValue}m:${secondsValue}s`,
      fiveK: `5k: ${fiveK.hours}h:${fiveK.remainingMinutes}m:${fiveK.remainingSeconds}s`,
      tenK: `10k: ${tenK.hours}h:${tenK.remainingMinutes}m:${tenK.remainingSeconds}s`,
      halfMarathon: `Half Marathon: ${halfMarathon.hours}h:${halfMarathon.remainingMinutes}m:${halfMarathon.remainingSeconds}`,
      marathon: `Marathon: ${marathon.hours}h:${marathon.remainingMinutes}m:${marathon.remainingSeconds}s`,
    };

    fetch('/stats', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSave),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response if needed
        console.log('Data saved successfully:', data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error saving data:', error);
      });
    setSavedData([...savedData, dataToSave]);

    localStorage.setItem('savedRunners', JSON.stringify([...savedData, dataToSave]));

    setNameValue('');
    setMinutesValue('');
    setSecondsValue('');
    
    for(const key in dataToSave){
      console.log(dataToSave[key]);
    }

  };

  return (
    <div>
      <div className='bg-img'></div>
      <div style={{ margin: '0 auto', textAlign: 'center', fontSize: '18px', position: 'relative' }}>
        <h1>Speedsters</h1>
        <br />
        {/* Input field with value and onChange event */}
        <label>
        Name:
          <input
            type="text"
            value={nameValue}
            onChange={handleNameValue}
            placeholder="Enter your name"
            style={{ fontSize: '16px' }}
          />
        </label>
        <br />
        <br />
        <label>
        Average Pace:
          <input
            type="number"
            value={minutesValue}
            onChange={handleMinutesValue}
            placeholder="min"
            style={{ width: '40px', fontSize: '16px' }}
          />
        </label>
        <label>
        :
          <input
            type="number"
            value={secondsValue}
            onChange={handleSecondsValue}
            placeholder="sec"
            style={{ width: '40px', fontSize: '16px' }}
          />
          minutes per mile
        </label>
        <br />
        <br />
        <button onClick = {calculateTimeInSeconds}>Calculate Time!</button>
        <br />
        <br />

        {/* Displaying the input value */}
        <p>Runner: {nameValue}</p>
        <p>Pace: {minutesValue}m:{secondsValue}s</p>
        {/* <p>Pace in seconds: {calculatedTime} </p> */}
        <p>5k: {fiveK && `${fiveK.hours}h:${fiveK.remainingMinutes}m:${fiveK.remainingSeconds}s`}</p>
        <p>10k: {tenK && `${tenK.hours}h:${tenK.remainingMinutes}m:${tenK.remainingSeconds}s`}</p>
        <p>Half Marathon: {halfMarathon && `${halfMarathon.hours}h:${halfMarathon.remainingMinutes}m:${halfMarathon.remainingSeconds}s`}</p>
        <p>Marathon: {marathon && `${marathon.hours}h:${marathon.remainingMinutes}m:${marathon.remainingSeconds}s`}</p>
        <br />
        <button onClick = {saveData}>Save</button>
        <br />
        <br />
        <button onClick = {openStatsPage}>Check Stats</button>
      </div>
    </div>
  );
};

// Using createRoot to render the component
const root = createRoot(document.getElementById('root'));
root.render(<Speedster />);