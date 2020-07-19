import React, { useEffect, useReducer, useRef } from 'react';

import useSetTimeout from 'use-set-timeout';

import { Alert, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import useProblemSet from '../../custom-hooks/useProblemSet';

import './Worksheet.css';
import TimeoutModal from '../../modals/TimeoutModal/TimeoutModal';
import StartTimerModal from '../../modals/StartTimerModal/StartTimerModal';

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
      };
    case 'SET_SHOW_START_TIMER_MODAL':
      return {
        ...state,
        startTimer: true,
        showStartTimerModal: false,
      };
    default:
      throw new Error('Action not found');
  }
}

const Worksheet = () => {
  const isMountedRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    isLoading,
    showSuccess,
    showError,
    correct,
    timeout,
    showTimeoutModal,
    showStartTimerModal,
    startTimer,
  } = state;

  const multiplier = useSelector((state) => state.questions.multiplier);

  const [problems] = useProblemSet(parseInt(multiplier));

  useEffect(() => {
    isMountedRef.current = true;
    timeout &&
      dispatch({ type: 'SET_SHOW_TIMEOUT_MODAL', showTimeoutModal: true });
    return () => (isMountedRef.current = false);
  }, [timeout]);

  useEffect(() => {
    isMountedRef.current = true;
    if (startTimer) {
      var timeleft = 70;
      var downloadTimer = setInterval(function () {
        document.getElementById('countdown').innerHTML = 'Timer: ' + timeleft;
        if (timeleft <= 5) {
          document.getElementById('countdown').className = 'counter hurry';
        }
        if (timeleft <= 0) {
          clearInterval(downloadTimer);
          dispatch({ type: 'SET_TIMEOUT', timeout: true });
        }
        timeleft--;
      }, 1000);
    }

    return () => (isMountedRef.current = false);
  }, [startTimer]);

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

  function range(start, end) {
    let myArray = [];
    for (let i = start; i <= end; i += 1) {
      myArray.push(i);
    }
    return myArray;
  }

  const handleSubmit = () => {
    const questionNum = range(1, 20);
    questionNum.map((num) => {
      if (!correct.includes(num)) {
        document.getElementById(num).className = 'problem wrong';
      }
    });
    if (correct.length >= 16) {
      dispatch({ type: 'SET_SHOW_SUCCESS', showSuccess: true });
    } else {
      dispatch({ type: 'SET_SHOW_ERROR', showError: true });
    }
  };

  return !multiplier ? (
    <Redirect to="/setup" />
  ) : (
    <>
      <div className="counter" id="countdown">
        Timer: 70
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
      <div>
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
      </div>
      <TimeoutModal
        showModal={showTimeoutModal}
        hideModal={() =>
          dispatch({ type: 'SET_SHOW_TIMEOUT_MODAL', showTimeoutModal: false })
        }
        numCorrect={correct.length}
        numProblems={problems.length}
      />
      <StartTimerModal
        showModal={showStartTimerModal}
        hideModal={() =>
          dispatch({
            type: 'SET_SHOW_START_TIMER_MODAL',
          })
        }
      />
    </>
  );
};

export default Worksheet;
