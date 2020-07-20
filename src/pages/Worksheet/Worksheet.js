import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import { Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoaderButton from '../../components/LoaderButton/LoaderButton';
import Timer from '../../components/Timer/Timer';

import TimeoutModal from '../../modals/TimeoutModal/TimeoutModal';
import StartTimerModal from '../../modals/StartTimerModal/StartTimerModal';

import useProblemSet from '../../custom-hooks/useProblemSet';

import './Worksheet.css';

const initialState = {
  correct: [],
  showSuccess: false,
  showError: false,
  isLoading: false,
  timeout: false,
  showTimeoutModal: false,
  startTimer: false,
  showStartTimerModal: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { correct: action.payload };
    case 'add':
      return { correct: [...state.correct, action.payload] };
    case 'SET_SHOW_SUCCESS':
      return {
        ...state,
        showSuccess: action.showSuccess,
      };
    case 'SET_SHOW_ERROR':
      return {
        ...state,
        showError: action.showError,
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_TIMEOUT':
      return {
        ...state,
        timeout: action.timeout,
      };
    case 'SET_SHOW_TIMEOUT_MODAL':
      return {
        ...state,
        showTimeoutModal: action.showTimeoutModal,
        message: action.message,
        icon: action.icon,
      };
    case 'SET_SHOW_START_TIMER_MODAL':
      return {
        ...state,
        showStartTimerModal: false,
      };
    default:
      throw new Error('Action not found');
  }
}

const Worksheet = () => {
  const isMountedRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [seconds, setSeconds] = useState(70);
  const [isActive, setIsActive] = useState(false);

  const {
    isLoading,
    showSuccess,
    showError,
    correct,
    timeout,
    showTimeoutModal,
    showStartTimerModal,
    message,
    icon,
  } = state;

  const multiplier = useSelector((state) => state.questions.multiplier);

  const [problems] = useProblemSet(parseInt(multiplier));

  function range(start, end) {
    let myArray = [];
    for (let i = start; i <= end; i += 1) {
      myArray.push(i);
    }
    return myArray;
  }

  const markWrong = useCallback(() => {
    const questionNum = range(1, 20);
    questionNum.forEach((num) => {
      if (!correct.includes(num)) {
        document.getElementById(num).className = 'problem wrong';
      }
    });
  }, [correct]);

  useEffect(() => {
    isMountedRef.current = true;
    if (timeout) {
      dispatch({
        type: 'SET_SHOW_TIMEOUT_MODAL',
        showTimeoutModal: true,
        message: 'Times up!',
        icon: 'alarm',
      });
      markWrong();
    }
    return () => (isMountedRef.current = false);
  }, [timeout, markWrong]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleOnChange = (answer, correctAnswer, question) => {
    if (showSuccess) {
      dispatch({ type: 'SET_SHOW_SUCCESS', showSuccess: false });
    } else if (showError) {
      dispatch({ type: 'SET_SHOW_ERROR', showError: false });
    }
    if (correct.includes(question)) {
      if (parseInt(answer) !== correctAnswer) {
        for (var i = 0; i < correct.length; i++) {
          if (correct[i] === question) {
            correct.splice(i, 1);
          }
        }
      }
      return;
    }
    if (parseInt(answer) === correctAnswer) {
      dispatch({ type: 'add', payload: question });
    }
    console.log(correct);
  };

  const handleSubmit = () => {
    setIsActive(false);
    markWrong();
    dispatch({
      type: 'SET_SHOW_TIMEOUT_MODAL',
      showTimeoutModal: true,
      message: 'You are quick!',
      icon: 'done',
    });
    // if (correct.length >= 16) {
    //   dispatch({ type: 'SET_SHOW_SUCCESS', showSuccess: true });
    // } else {
    //   dispatch({ type: 'SET_SHOW_ERROR', showError: true });
    // }
  };

  const handleCloseStartTimerModal = () => {
    dispatch({
      type: 'SET_SHOW_START_TIMER_MODAL',
      showStartTimerModal: false,
    });
    setIsActive(true);
  };

  return !multiplier ? (
    <Redirect to="/setup" />
  ) : (
    <>
      <div className="counter" id="countdown">
        <Timer
          isActive={isActive}
          setIsActive={setIsActive}
          markWrong={markWrong}
          dispatch={dispatch}
        />
      </div>
      <div className="Worksheet">
        {problems.map((problem) => (
          <React.Fragment key={problem.question}>
            <table id={problem.question} className="problem">
              <tbody>
                <tr>
                  <td></td>
                  <td>{problem.firstNumber}</td>
                </tr>
                <tr className="bottom">
                  <td className="text-left">x</td>
                  <td>{problem.secondNumber}</td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <Form>
                      <Form.Group>
                        <Form.Control
                          type="tel"
                          disabled={timeout}
                          onBlur={(e) => {
                            handleOnChange(
                              e.target.value,
                              problem.answer,
                              problem.question
                            );
                          }}
                        />
                      </Form.Group>
                    </Form>
                  </td>
                </tr>
              </tbody>
            </table>
          </React.Fragment>
        ))}
      </div>
      <div className="buttonContainer">
        <LoaderButton
          type="submit"
          isLoading={isLoading}
          text="Submit"
          loadingText=" Checking..."
          onClick={handleSubmit}
        />
      </div>
      {/* <div>
        {showSuccess && (
          <Alert
            onClose={() =>
              dispatch({ type: 'SET_SHOW_SUCCESS', showSuccess: false })
            }
            variant="success"
            dismissible
          >
            You answered {correct.length} correct out of {problems.length}
          </Alert>
        )}
      </div>
      <div>
        {showError && (
          <Alert
            onClose={() =>
              dispatch({ type: 'SET_SHOW_ERROR', showError: false })
            }
            variant="danger"
            dismissible
          >
            You answered {correct.length} correct out of {problems.length}
          </Alert>
        )}
      </div> */}
      <TimeoutModal
        showModal={showTimeoutModal}
        hideModal={() =>
          dispatch({ type: 'SET_SHOW_TIMEOUT_MODAL', showTimeoutModal: false })
        }
        numCorrect={correct.length}
        numProblems={problems.length}
        message={message}
        icon={icon}
      />
      <StartTimerModal
        showModal={showStartTimerModal}
        hideModal={handleCloseStartTimerModal}
      />
    </>
  );
};

export default Worksheet;
