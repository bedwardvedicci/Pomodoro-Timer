import React from "react";

export const Presentational = (props) => (
  <div>
    <App propys={props}/> {/*passing down all the props using "propys" attribute*/}
  </div>
);

const App = (props) => {
  props = props.propys; /*passing the props from "propys" to "App"'s "props"*/
  return (
    <div className="topWrapper">
      <header><span className="title">Pomodoro Timer</span></header>
      <div className="tomatoWrapper">
        <div id="tomato">
          <LengthSetter /*labId: label ID, decId: decrement ID, lenId: length ID, incId: increment ID, */
            id="break"
            labId="break-label" label="Break Length"
            decId="break-decrement" decreaser={props.decreaseBreakLength}
            lenId="break-length" length={props.breakLength}
            incId="break-increment" increaser={props.increaseBreakLength}
          />
          <Display
            timerLabel={props.currentlyPlaying}
            timeLeft={`${props.minuteLeft}:${props.secondLeft}`}
            playPause={props.playPause}
            reset={props.reset}
          />
          <LengthSetter /*labId: label ID, decId: decrement ID, lenId: length ID, incId: increment ID, */
            id="session"
            labId="session-label" label="Session Length"
            decId="session-decrement" decreaser={props.decreaseSessionLength}
            lenId="session-length" length={props.sessionLength}
            incId="session-increment" increaser={props.increaseSessionLength}
          />
        </div>
      </div>
    </div>
  );
}

const LengthSetter = (props) => {
  return (
    <div id={props.id} className="lengthParent">
      <label id={props.labId}>{props.label}</label>
      <div>
        <button id={props.decId} onClick={props.decreaser} >
          <i className="tI-minus"></i>
        </button>
        <span id={props.lenId}>
          {props.length}
        </span>
        <button id={props.incId} onClick={props.increaser}>
          <i className="tI-plus"></i>
        </button>
      </div>
    </div>
  );
}

const Display = (props) => {
  return (
    <div id="display">
      <div>
        <button onClick={props.playPause} id="start_stop">
          <i className="tI-pause"></i>
        </button>
      </div>
      <div>
        <label id="timer-label">{props.timerLabel}</label>
        <div id="time-left">{props.timeLeft}</div>
        <audio
          id="beep"
          type="audio/mpeg"
          src="https://www.myinstants.com/media/sounds/anime-wow-sound-effect-mp3cut.mp3"
        />
      </div>
      <div>
        <button onClick={props.reset} id="reset">
          <i className="tI-reload"></i>
        </button>
      </div>
    </div>
  );
}
