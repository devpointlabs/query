class Api::QuizzesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_quiz, only: [:stop, :update, :destroy, :show, :take]

  def index
    render json: current_user.quizzes
  end

  def substuff
    render json: Quiz.substuff(current_user.id)
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
    @quiz.update(quiz_params)
      render json: @quiz
  end

  def stop 
      subs = @quiz.submissions.where(going: true)
      subs.each do |s|
        s.update(going: false)
    end
    @quiz.update(quiz_params)
      render json: @quiz
  end


  def destroy
    @quiz.destroy
    render json: { message: "deleted"}
  end
  
  private 
    def quiz_params
      params.require(:quiz).permit(:name, :info, :active, :end, :anon, :email)
    end

    def set_quiz
      @quiz = Quiz.find(params[:id])
    end
end


