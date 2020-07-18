import { useEffect, useReducer } from 'react';

const initialState = { problems: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { problems: action.payload };
    case 'add':
      return { problems: [...state.problems, action.payload] };
    default:
      throw new Error('Action not found');
  }
}

const useProblemSet = (firstNumber) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function createProblemSet() {
      let r,
        r2,
        rand,
        n,
        n2,
        numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      n = numbers.slice(0);
      n2 = numbers.slice(0);
      r = [];
      r2 = [];
      while (n.length) {
        rand = Math.floor(Math.random() * n.length);
        r.push(n.splice(rand, 1));
        dispatch({
          type: 'add',
          payload: {
            question: r.length,
            firstNumber: firstNumber,
            secondNumber: r[r.length - 1],
            answer: firstNumber * r[r.length - 1],
          },
        });
      }
      while (n2.length - 4) {
        rand = Math.floor(Math.random() * n2.length);
        r2.push(n2.splice(rand, 1));
        dispatch({
          type: 'add',
          payload: {
            question: r2.length + r.length,
            firstNumber: firstNumber,
            secondNumber: r2[r2.length - 1],
            answer: firstNumber * r2[r2.length - 1],
          },
        });
      }

      // const totalQuestions = parseInt(questions);
      // const difficulty = parseInt(diff);

      // for (var i = 0; i < totalQuestions; i++) {
      //   const question = i + 1;
      //   const secondNumber = Math.floor(Math.random() * difficulty);
      //   const answer = firstNumber * secondNumber;
      //   dispatch({
      //     type: 'add',
      //     payload: {
      //       question: question,
      //       firstNumber: firstNumber,
      //       secondNumber: secondNumber,
      //       answer: answer,
      //     },
      //   });
      // }
    }
    createProblemSet();
  }, [firstNumber]);

  function createProblemSet() {
    let r,
      rand,
      n,
      numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    n = numbers.slice(0);
    r = [];
    while (n.length) {
      rand = Math.floor(Math.random() * n.length);
      r.push(n.splice(rand, 1));
      dispatch({
        type: 'add',
        payload: {
          question: r.length,
          firstNumber: firstNumber,
          secondNumber: r[r.length - 1],
        },
      });
    }

    // const totalQuestions = parseInt(questions);
    // const difficulty = parseInt(diff);

    // for (var i = 0; i < totalQuestions; i++) {
    //   const question = i + 1;
    //   const secondNumber = Math.floor(Math.random() * difficulty);
    //   const answer = firstNumber * secondNumber;
    //   dispatch({
    //     type: 'add',
    //     payload: {
    //       question: question,
    //       firstNumber: firstNumber,
    //       secondNumber: secondNumber,
    //       answer: answer,
    //     },
    //   });
    // }
  }

  return [state.problems, createProblemSet];
};

export default useProblemSet;
