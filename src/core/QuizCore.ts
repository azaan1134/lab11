import quizData from '../data/quizData';
import QuizQuestion from './QuizQuestion';

/**
 * The `QuizCore` class represents the core logic for managing a quiz, including
 * maintaining the quiz questions, tracking the user's progress, and calculating
 * their score.
 */
class QuizCore {
  private questions: QuizQuestion[];
  private currentQuestionIndex: number;
  private score: number;
  private userAnswers: string[] = []; // хэрэглэгчийн хариултуудыг хадгалах

  constructor() {
    this.questions = quizData;
    this.currentQuestionIndex = 0;
    this.score = 0;
  }

  /**
   * Get the current question.
   */
  public getCurrentQuestion(): QuizQuestion | null {
    if (
      this.currentQuestionIndex >= 0 &&
      this.currentQuestionIndex < this.questions.length
    ) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  /**
   * Move to the next question.
   */
  public nextQuestion(): void {
    this.currentQuestionIndex++;
  }

  /**
   * Move to the previous question.
   */
  public previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  /**
   * Checks if there is a next question available in the quiz.
   */
  public hasNextQuestion(): boolean {
    return this.currentQuestionIndex < this.questions.length - 1;
  }

  /**
   * Records the user's answer and updates the score if correct.
   */
  public answerQuestion(answer: string): void {
    const currentQuestion = this.getCurrentQuestion();
    if (currentQuestion) {
      this.userAnswers[this.currentQuestionIndex] = answer;
      if (answer === currentQuestion.correctAnswer) {
        this.score++;
      }
    }
  }

  /**
   * Get user's selected answers.
   */
  public getUserAnswers(): string[] {
    return this.userAnswers;
  }

  /**
   * Restart the quiz by resetting progress and answers.
   */
  public restart(): void {
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
  }

  /**
   * Get the index of the current question.
   */
  public getCurrentIndex(): number {
    return this.currentQuestionIndex;
  }

  /**
   * Get the user's current score.
   */
  public getScore(): number {
    return this.score;
  }

  /**
   * Get total number of questions.
   */
  public getTotalQuestions(): number {
    return this.questions.length;
  }

  /**
   * Get all quiz questions (for displaying result summary).
   */
  public getAllQuestions(): QuizQuestion[] {
    return this.questions;
  }
}

export default QuizCore;
