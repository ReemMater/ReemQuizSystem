import React, { useContext } from 'react';
import QuestionContext from '../../../context/questions/questionContext';
import PropTypes from 'prop-types';

const QuestionItem = ({ question }) => {
  const questionContext = useContext(QuestionContext);
  const { deleteQuestion, setcurrent, clearCurrent } = questionContext;
  const {
    questiontext,
    choice1,
    choice2,
    choice3,
    choice4,
    correct,
  } = question;

  const onDelete = () => {
    deleteQuestion({ id: question._id });
    clearCurrent();
  };

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <div className='card bg-light'>
      <div className='card-header'>
        <h3 className='text-primary text-left'>{questiontext}</h3>
      </div>
      <div className='card-body'>
        <div className='row'>
          <div className='col-6'>
            <p>Choice One : {choice1}</p>
          </div>
          <div className='col-6'>
            <p>Choice Two : {choice2}</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-6'>
            <p>Choice Three : {choice3}</p>
          </div>
          <div className='col-6'>
            <p>Choice Four : {choice4}</p>
          </div>
        </div>

        <p>Correct : {correct}</p>
      </div>
      <div className='card-footer'>
        <p>
          <button
            className='btn btn-dark btn-sm'
            onClick={() => {
              setcurrent(question);
              topFunction();
            }}>
            Edit
          </button>
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};
QuestionItem.propTypes = {
  question: PropTypes.object.isRequired,
};
export default QuestionItem;
