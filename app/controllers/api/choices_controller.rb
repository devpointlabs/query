class Api::ChoicesController < ApplicationController
  before_action :set_question
  before_action :set_choice, only: [:show, :update, :destroy]

  # GET /choices
  def index
    @choices = @question.choices.all
    render json: @choices
  end

  # GET /choices/1
  def show
    render json: @choice
  end

  # POST /choices
  def create
    @choice = @question.choices.new(choice_params)

    if @choice.save
      render json: @choice
    else
      render json: @choice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /choices/1
  def update
    if @choice.update(choice_params)
      render json: @choice
    else
      render json: @choice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /choices/1
  def destroy
    @choice.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_choice
      @choice = @question.choices.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def choice_params
      params.require(:choice).permit(:answer, :correct_answer)
    end

    def set_question
      @question = Question.find(params[:question_id])
    end
end
