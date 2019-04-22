class Api::SubmissionChoicesController < ApplicationController
  before_action :set_submission

  def index
    render json: @submission.submission_choices
  end

  def index_with_choice_name
    choices = @submission.submission_choices
    arr = []
    
    choices.each do |c|
      ob = {
        choice: c,
        answer: c.choice.answer,
        correct: c.choice.correct_answer,
        question_text: c.choice.question.name,
        question_type: c.choice.question.qType,
        choice_id: c.choice.id,
        choices: c.choice.question.choices,
        explanation: c.choice.question.explanation
      }
      arr << ob
    end
    render json: arr.to_json
  end

  def show
    s = @submission.submission_choices.find(params[:id])
    @choice = s.choice
    render json: @choice
  end

  def create
    submission_choice = @submission.submission_choices.new(submission_choice_params)

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
    @submission = Submission.find(params[:submission_id])
  end
  
  def submission_choice_params
    params.require(:submission_choice).permit(:choice_id, :student_answer)
  end

end
