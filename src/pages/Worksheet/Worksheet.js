import React, { useEffect, useReducer, useRef } from 'react';

import { Alert, Form } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import useProblemSet from '../../custom-hooks/useProblemSet';

import './Worksheet.css';

const initialState = {
  correct: [],
  showSuccess: false,
  showError: false,
  isLoading: false,
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
    default:
      throw new Error('Action not found');
  }
}

const Worksheet = () => {
  const isMountedRef = useRef(null);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading, showSuccess, showError, correct } = state;

  const multiplier = useSelector((state) => state.questions.multiplier);

  const [problems] = useProblemSet(parseInt(multiplier));

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

  useEffect(() => {
    isMountedRef.current = true;
    console.log(
      `You have answered ${correct.length} correct out of ${problems.length}`
    );
    return () => (isMountedRef.current = false);
  }, [problems, correct]);

  const handleSubmit = () => {
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
      <div className="Worksheet">
        {problems.map((problem) => (
          <React.Fragment key={problem.question}>
            <table className="problem">
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
    </>
  );
};

export default Worksheet;
