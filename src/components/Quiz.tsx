import React, { useState } from 'react';
import './Quiz.css';
import QuizCore from '../core/QuizCore';
import QuizQuestion from '../core/QuizQuestion';

const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState(new QuizCore());
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion: QuizQuestion | null = quiz.getCurrentQuestion();

  const handleOptionSelect = (option: string): void => {
    setSelectedAnswer(option);
  };

  const handleButtonClick = (): void => {
    if (selectedAnswer) {
      quiz.answerQuestion(selectedAnswer);
      setSelectedAnswer(null);
      if (quiz.hasNextQuestion()) {
        quiz.nextQuestion();
      } else {
        setQuizCompleted(true); // Complete the quiz
      }
      setQuiz(Object.create(quiz)); // Trigger React re-render
    }
  };

  if (quizCompleted) {
    return (
      <div className="quiz-completed-container">
        <h2>Quiz Completed</h2>
        <p className="final-score">
          Final Score: {quiz.getScore()} out of {quiz.getTotalQuestions()}
        </p>
        <div className="questions-container">
          {quiz.getAllQuestions().map((question, index) => {
            const userAnswer = quiz.getUserAnswers()[index];
            const isCorrect = userAnswer === question.correctAnswer;
            return (
              <div
                key={index}
                className={`question-container ${isCorrect ? 'correct' : 'incorrect'}`}
              >
                <h3>{question.question}</h3>
                <p className="answer">
                  Your answer: <span className={`answer-text ${isCorrect ? 'green' : 'red'}`}>{userAnswer}</span>
                </p>
              </div>
            );
          })}
        </div>
        <button
          className="restart-button"
          onClick={() => {
            const newQuiz = new QuizCore();
            setQuiz(newQuiz);
            setSelectedAnswer(null);
            setQuizCompleted(false); // Reset quiz completion
          }}
        >
          Restart Quiz
        </button>
      </div>
    );
  }
  
  if (!currentQuestion) {
    return (
      <div>
        <h2>Loading question...</h2>
      </div>
    );
  }
  
  

  if (!currentQuestion) {
    return (
      <div>
        <h2>Loading question...</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>

      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer ? (option === selectedAnswer ? 'selected' : 'option') : 'option'}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick} disabled={!selectedAnswer}>
        {quiz.hasNextQuestion() ? 'Next Question' : 'Finish'}
      </button>

      {quiz.getCurrentIndex() > 0 && (
        <button
          onClick={() => {
            quiz.previousQuestion();
            setSelectedAnswer(null);
            setQuiz(Object.create(quiz)); // UI refresh
          }}
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default Quiz;
