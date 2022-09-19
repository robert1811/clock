/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  
  const[breakLength, setBreakLength] = useState(5);
  const[sessionLength, setSessionLength] = useState(25);
  const[minute, setMinute] = useState(sessionLength);
  const[second, setSecond] = useState(0);
  const[power, setPower] = useState(false);
  const[didStart, setDidStart] = useState(false);
  const[session, setSession] = useState(true);

  useEffect(() => {
      timeout = setTimeout(() => {
      if(second > 0){
        if(power){
          setSecond(second - 1);}
        } else if(second > 0 && second <= 10){
          setSecond(second - 1);
        }  else if(second === 0){
          setSecond(59);
          setMinute(minute - 1);
        } else if(minute > 0){
          setMinute(minute - 1);
        } 
        if(!session && minute === 0 && second === 0){
            setMinute(sessionLength);
            setSecond(0);
            setSession(true);
        }else if(minute === 0 && second === 0){
            setMinute(breakLength);
            setSecond(0);
            setSession(false)
          }
        }, 1000);
        if(second === 0 && minute === 0){
          playAudio();
        }
        if(!power){
          clearTimeout(timeout);
          setMinute(minute);
          setSecond(second);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [second, power, minute, sessionLength, breakLength, session])
  let timeout = null ;
  const audio = document.getElementById("beep");

  const playAudio = () =>{
    audio.play()
  }

  const incrementBreak = () =>{
    if(breakLength !== 60 && !power){
    setBreakLength(breakLength + 1);
    if(!session){
      setMinute(breakLength + 1);
      setSecond(0);
    }
    }
  }
  const decrementBreak = () =>{
    if(breakLength !== 1 && !power)
    setBreakLength(breakLength - 1);
    if(!session){
      setMinute(breakLength - 1);
      setSecond(0);
    }
  }
  const incrementSession = () =>{
    if(sessionLength !== 60 && !power){
    setSessionLength(sessionLength + 1);
    if(session){
    setMinute(sessionLength + 1);
    setSecond(0);
    }
    }
  }
  const decrementSession = () =>{
    if(sessionLength !== 1 && !power){
      setSessionLength(sessionLength - 1);
      if(session){
      setMinute(sessionLength - 1);
      setSecond(0);
      }
    }
    
  }

  const handlePause = () =>{
    if(!power){
      setPower(true);
      if(!didStart){
        setDidStart(true);
        setSecond(0);
        setMinute(sessionLength)
      }
      }else if(power){
        setPower(false);
        setSecond(second);
        setMinute(minute);
        window.clearTimeout(timeout)
      }
  }

  const reset = () =>{
    window.clearTimeout(timeout)
    audio.pause();
    audio.currentTime = 0;
    setPower(false);
    setSessionLength(25);
    setBreakLength(5);
    setMinute(25);
    setSecond(0);
    setPower(false);
    setSession(true);
    setDidStart(false);
  }

  return (
    <div className="App">
        <h1>25 + 5 Clock</h1>
          <div id="clock-container">
          <audio  id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
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
              <div id="timer-label">{session ? "Session" : "Break"}</div>
              <div id="time-left">{minute < 10 ? "0" + minute : minute}:{second < 10 ? "0" + second : second}</div>
            </div>
          </div>
          <div className="timer-control">
            <button id="start_stop" onClick={handlePause}>
              <i className={!power ? "bi bi-play-fill" : "bi bi-pause-fill"}></i>
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
