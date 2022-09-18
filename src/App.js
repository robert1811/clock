import './App.css';
import {useState, useEffect} from 'react';

function App() {
  
  const[breakLength, setBreakLength] = useState(5);
  const[sessionLength, setSessionLength] = useState(25);
  const[minute, setMinute] = useState(sessionLength);
  const[second, setSecond] = useState("00");
  const[power, setPower] = useState(false);
  const[didStart, setDidStart] = useState(false);

  useEffect(() => {
  if(minute > 0 && minute <= 10){
    setMinute("0" + minute - 1)
  }else if(minute >= 0 && minute >= 10){
    setMinute(minute)}
    setTimeout(() => {
        if(power && minute !== 0 && second !== 0){
        if(second > 0 && second > 10){
          setSecond(second - 1);
        } else if(second > 0 && second <= 10){
          setSecond("0" + second - 1);
        }  else if(second === 0){
          setSecond(59);
          setMinute(minute - 1);
        } else if(minute > 0 && minute <= 10){
          setMinute("0" + minute - 1);
        } else if(minute === 0 && second === 0){
          setMinute(breakLength);
          setSecond("00")
        }
        }
        }, 100);
    }, [second, power, minute, sessionLength, breakLength])

  const incrementBreak = () =>{
    if(breakLength !== 60 && !power){
    setBreakLength(breakLength + 1)
    }
  }
  const decrementBreak = () =>{
    if(breakLength !== 1 && !power)
    setBreakLength(breakLength - 1)
  }
  const incrementSession = () =>{
    if(sessionLength !== 60 && !power){
    setSessionLength(sessionLength - 1 + 2);
    setMinute(sessionLength + 1);
    setSecond("00");
    }
  }
  const decrementSession = () =>{
    if(sessionLength !== 1 && !power){
      setSessionLength(sessionLength - 1);
      setMinute(sessionLength - 1);
      setSecond("00");
    }
    
  }

  const handlePause = () =>{
    if(!power){
      setPower(true);
      document.querySelector('.bi-play-fill').classList.replace('bi-play-fill', 'bi-pause-fill');
      if(!didStart){
        setDidStart(true);
        setSecond(59);
        setMinute(minute - 1)
      }
      }else if(power){
        setPower(false);
        document.querySelector('.bi-pause-fill').classList.replace('bi-pause-fill', 'bi-play-fill');
        setSecond(second);
        setMinute(minute);
        clearTimeout();
      }
  }

  const reset = () =>{
    clearTimeout();
    setPower(false);
    setSessionLength(25);
    setBreakLength(5);
    setMinute(25);
    setSecond("00");
    setPower(false);
    setDidStart(false);
  }

  return (
    <div className="App">
        <h1>25 + 5 Clock</h1>
          <div id="clock-container">
          <div id='label-container'>
            <div className="length-control">
              <div id='break-label'>Break Length</div>
                <div className="btn-pad">
                  <button className="btn-level" id='break-decrement' onClick={decrementBreak}>
                    <i className="bi bi-arrow-down" />
                  </button>
                  <div className="length" id="break-length">{breakLength}</div>
                  <button className="btn-level" id='break-increment' onClick={incrementBreak}>
                    <i className="bi bi-arrow-up" />
                  </button>
                </div>
              </div>
            <div className="length-control">
              <div id="session-label">Session Length</div>
              <div className="btn-pad">
                <button className="btn-level" id="session-decrement"  onClick={decrementSession}>
                  <i className="bi bi-arrow-down" />
                </button>
                <div className="length" id="session-length">{sessionLength}</div>
                <button className="btn-level" id="session-increment" onClick={incrementSession}>
                  <i className="bi bi-arrow-up" />
                </button>
              </div>
            </div>
          </div>
          <div className="timer">
            <div className="time-wrapper">
              <div id="timer-label">Session</div>
              <div id="time-left">{minute}:{second}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={handlePause}>
              <i className="bi bi-play-fill"></i>
            </button>
            <button id="reset" onClick={reset}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
          </div>
    </div>
  );
}

export default App;
