class Api::SubmissionsController < ApplicationController

  def add_student_to_quiz
    student = User.where(email: params[:email])
    render json: student
    binding.pry
  end

  def index
    render json: current_user.submissions.all
  end

  def show
    render json: @submission
  end

  def create
    submission = current_user.submissions.new(submission_params)

    if submission.save
      render json: current_user.submission
    else
      render json: submission.errors, status: 422
    end
  end

  def update
  end

  def destroy
  end

  private

  def submissions_params
    params.require(:submissions).permit(current_user)
  end
end
