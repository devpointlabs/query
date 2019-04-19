class Api::StudentListsController < ApplicationController
  before_action :set_student_list, only: [:show, :update, :destroy]

  # GET /student_lists
  def index
    @student_lists = current_user.student_lists

    render json: @student_lists
  end

  # GET /student_lists/1
  def show
    render json: @student_list
  end

  # POST /student_lists
  def create
    @student_list = current_user.student_lists.new(student_list_params)

    if @student_list.save
      render json: @student_list
    else
      render json: @student_list.errors
    end
  end

  # PATCH/PUT /student_lists/1
  def update
    if @student_list.update(student_list_params)
      render json: @student_list
    else
      render json: @student_list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /student_lists/1
  def destroy
    @student_list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_student_list
      @student_list = StudentList.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def student_list_params
      params.require(:student_list).permit(:email, :name)
    end
end
