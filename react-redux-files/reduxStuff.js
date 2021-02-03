import { createStore } from "redux";

const initialState = {
  breakLength: 5
  , sessionLength: 25
  , currentlyPlaying: "Session"
  , minuteLeft: 25
  , secondLeft: 0
  , playing: false
  , countDownIntervalId: ""
}

const INCBREAK = "INCBREAK"; // Increase Break Length
const DECBREAK = "DECBREAK"; // Decrease Break Length
const INCSESSION = "INCSESSION"; // Increase Session Length
const DECSESSION = "DECSESSION"; // Decrease Session Length
const PLAYPAUSE = "PLAYPAUSE";
const COUNTDOWN = "COUNTDOWN";
const RESET = "RESET";

const increaseBreakLength = () => ({
  type: INCBREAK
})
const decreaseBreakLength = () => ({
  type: DECBREAK
})
const increaseSessionLength = () => ({
  type: INCSESSION
})
const decreaseSessionLength = () => ({
  type: DECSESSION
})
const playPause = () => ({
  type: PLAYPAUSE
})
const countDown = () => ({
  type: COUNTDOWN
})
const reset = () => ({
  type: RESET
})

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case INCBREAK // Increases Break Length
    : if(state.playing) {
        return state;
      } else {
        return state.breakLength === 60 //?
        ? state
        : {
          ...state
          , breakLength: state.breakLength+1
          , minuteLeft: state.currentlyPlaying === "Break"
              ? state.breakLength+1 // Adds 1 to the Break Length
              : state.minuteLeft // (i.e. Leave Untouched)
          , secondLeft: 0
        }
      }
    case DECBREAK // Decreases Break Length
    : if(state.playing) {
        return state;
      } else {
        return state.breakLength === 1 //?
        ? state
        : {
          ...state
          , breakLength: state.breakLength-1
          , minuteLeft: state.currentlyPlaying === "Break"
              ? state.breakLength-1  // Subtracts 1 from the Break Length
              : state.minuteLeft // (i.e. Leave Untouched)
          , secondLeft: 0
        }
      }
    case INCSESSION
    : if(state.playing) {
        return state;
      } else {
        return state.sessionLength === 60 //?
        ? state
        : {
          ...state
          , sessionLength: state.sessionLength+1
          , minuteLeft: state.currentlyPlaying === "Session"
              ? state.sessionLength+1 // Adds 1 to the Session Length
              : state.minuteLeft // (i.e. Leave Untouched)
          , secondLeft: 0
        }
      }
    case DECSESSION
    : if(state.playing) {
        return state;
      } else {
        return state.sessionLength === 1 //?
        ? state
        : {
          ...state
          , sessionLength: state.sessionLength-1
          , minuteLeft: state.currentlyPlaying === "Session"
              ? state.sessionLength-1 // Subtracts 1 from the Session Length
              : state.minuteLeft // (i.e. Leave Untouched)
          , secondLeft: 0
        }
      }
    case COUNTDOWN
    : {
      return (state.minuteLeft + state.secondLeft) === 0 // checks if time is 00:00
        ? (()=>{
          document.getElementById("beep").play() // plays the Sound
            .catch(()=>document.getElementById("beep").play()); // replays the sound if it didn't

          return state.currentlyPlaying === "Session" //if Session go to Break and vice-versa
            ? {
              ...state
              , currentlyPlaying: "Break"
              , minuteLeft: state.breakLength // refills the minutes
            }
            : {
              ...state
              , currentlyPlaying: "Session"
              , minuteLeft: state.sessionLength // refills the minutes
            }
        })()
        : (()=>{ // if time is not 00:00
          if(state.secondLeft === 0 && state.minuteLeft > 0) {
            return ({
              ...state
              , minuteLeft: state.minuteLeft-1
              , secondLeft: 59
            })
          } else {
            return ({
              ...state
              , secondLeft: state.secondLeft-1
            })
          }
        })()
    }
    case PLAYPAUSE
    : {
      if (state.playing) { // if playing -> stop it, and vice-versa
        clearInterval(state.countDownIntervalId); // to clear(stop) the interval(countdown)
        return {...state, playing: false}
      } else { // if it is not playing:
        const countDownIntervalId = setInterval(()=>{ // create a new Interval and store Id in state
          store.dispatch(countDown())
        }, 1000)
        return {...state, playing: true, countDownIntervalId: countDownIntervalId}
      }
    }
    case RESET
    : {
      if(state.countDownIntervalId) clearInterval(state.countDownIntervalId);
      document.getElementById("beep").pause(); // stops the sound
      document.getElementById("beep").load(); // reloads the sound
      return initialState;
    }
    default
    : return state
  }
}


export const store = createStore(reducer);
export const mapStateToProps = (state) => ({
  breakLength: state.breakLength.toString()

  , sessionLength: state.sessionLength.toString()

  , minuteLeft: /^\d$/.test(state.minuteLeft) // to add "0" to the beginning of the digit (ex: 01)
                  ? "0".concat(state.minuteLeft.toString())
                  : state.minuteLeft.toString()

  , secondLeft: /^\d$/.test(state.secondLeft)
                  ? "0".concat(state.secondLeft.toString()) // same as "minuteLeft" but with seconds
                  : state.secondLeft.toString()

  , currentlyPlaying: state.currentlyPlaying
})
export const mapDispatchToProps = (dispatch) => ({
  increaseBreakLength: () => dispatch(increaseBreakLength())
  , decreaseBreakLength: () => dispatch(decreaseBreakLength())
  , increaseSessionLength: () => dispatch(increaseSessionLength())
  , decreaseSessionLength: () => dispatch(decreaseSessionLength())
  , playPause: () => dispatch(playPause())
  , reset: () => dispatch(reset())
})