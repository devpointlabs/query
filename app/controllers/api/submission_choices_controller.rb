class Api::SubmissionChoicesController < ApplicationController
  before_action :set_submission
  before_action :set_submission_choice, only: [:show, :update, :destroy]

  def index
    render json: @submission.submission_choices
  end

  def show
    render json: @submission_choice
  end

  def create
    submission_choice = submission.submission_choices.new(submission_choice_params)

    if submission_choice.save
      render json: submission_choice
    else
      render json: submission_choice.errors, status: 422
    end
  end

  def update
    if @submission_choice.update(submission_choice_params)
      render json: @submission_choice
    else
      render json: submission_choice.errors, status: 422
    end
  end

  def destroy
    @submission_choice.destroy
  end

  private

  def set_submission
    binding.pry
    @submission = Submission.find(params[:submission_id])
  end
  
  def set_submission_choice
    @submission_choice = Submission_Choice.find(params[:id])
  end

  def submission_choice_params
    params.require(:submission_choice).permit(:choice_id, :student_answer)
  end

end
