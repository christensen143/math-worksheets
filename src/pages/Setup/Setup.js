import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import allActions from '../../state/actions';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

import './Setup.css';

const Setup = () => {
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsLoading(true);
    history.push('/worksheet');
    setIsLoading(false);
  };

  return (
    <div className="Setup">
      <Form>
        <Form.Group controlId="firstNumber">
          <Form.Label>What multiplier would you like to use?</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => {
              dispatch(
                allActions.questionActions.setMultiplier(e.target.value)
              );
            }}
          >
            <option>Choose...</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <LoaderButton
        type="submit"
        isLoading={isLoading}
        text="Submit"
        loadingText=" Loading..."
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Setup;
