class Api::QuestionsController < ApplicationController
  before_action :set_quiz
  before_action :set_question, only: [:show, :update, :destroy]

  # GET /questions
  def index
    @questions = @quiz.questions.all
    render json: @questions
  end

  # GET /questions/1
  def show
    render json: @question
  end

  # POST /questions
  def create
    question = @quiz.questions.create(question_params)

    if question.save
      render json: question, status: :created, location: question
    else
      render json: question.errors, status: :unprocessable_entity
    end
  end

  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questions/1
  def destroy
    @question.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_quiz
      @quiz = Quiz.find(params[:quiz_id])
    end

    def set_question
      @question = Question.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def question_params
      params.require(:question).permit(:name)
    end
end
