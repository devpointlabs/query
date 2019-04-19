require 'test_helper'

class StudentListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student_list = student_lists(:one)
  end

  test "should get index" do
    get student_lists_url, as: :json
    assert_response :success
  end

  test "should create student_list" do
    assert_difference('StudentList.count') do
      post student_lists_url, params: { student_list: { email: @student_list.email } }, as: :json
    end

    assert_response 201
  end

  test "should show student_list" do
    get student_list_url(@student_list), as: :json
    assert_response :success
  end

  test "should update student_list" do
    patch student_list_url(@student_list), params: { student_list: { email: @student_list.email } }, as: :json
    assert_response 200
  end

  test "should destroy student_list" do
    assert_difference('StudentList.count', -1) do
      delete student_list_url(@student_list), as: :json
    end

    assert_response 204
  end
end
