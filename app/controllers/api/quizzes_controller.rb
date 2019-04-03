class Api::QuizzesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz, only: [:update, :destroy, :show]

  def index
    render json: Quiz.all
  end

  def create
    quiz = Quiz.create(quiz_params)
    if quiz.save
      render json: quiz
    else
      render json: quiz.errors, status: 422
    end
  end

  def show 
    render json: @quiz
  end

  def update
    if @quiz.update(quiz_params)
      render json: @quiz
    else
      render json: @quiz.errors
    end
  end

  def destroy
    @quiz.destroy
    render json: { message: "deleted"}
  end
  
  private 
    def quiz_params
      params.require(:quiz).permit(:name)
    end

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end
end


