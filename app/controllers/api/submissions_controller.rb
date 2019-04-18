class Api::SubmissionsController < ApplicationController
  before_action :set_submission, only: [:show, :get_grade]
  def add_student_to_quiz
    emails = params.require(:email)
      emails.each do |email|
      the_params(email)
    end
  end

  def index
    render json: current_user.submissions.all
  end

  def show
    render json: @submission
  end

  def get_grade
    render json: { grade: @submission.grade}
  end
  

  def student_submissions
    # get submissions where the user owning the submission is not a teacher
    student_subs = Submission.joins(:user).where(users: { teacher: false })
    arr = []
    
    student_subs.each do |sub|
      ob = {
        submission: sub,
        email: sub.user.email,
        quiz: sub.quiz.name
      }
      arr << ob
    end
    render json: arr.to_json
  
  end

  def submissions_by_quiz
    render json: Submission.submissions_by_quiz(params[:quiz_id].to_i)
  end

  def create
    @quiz = current_user.quizzes.new(quiz_params)
    if @quiz.save
      sub = current_user.submissions.new({quiz_id: @quiz.id, user_id: params.require(:quiz)["user_id"]})
      sub.save
     render json: @quiz
    else
      render json: @quiz.errors, status: 422
    end
  end

  def update
  end

  def destroy
  end

  private

  def the_params(email)
    do_it = true
    student= User.where(email: email)
    quiz= params.require(:submission).permit(:quiz_id)
      sub = Submission.new(
        quiz.merge({user_id: student[0].id.to_s})
        )
        sub.save
  end

  def quiz_params
    params.require(:quiz).permit(:name, :info, :anon)
  end

  def submissions_params(quiz)

  end

  def set_submission
    @submission = Submission.find(params[:id])
  end
end
