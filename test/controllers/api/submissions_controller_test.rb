require 'test_helper'

class Api::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_submissions_index_url
    assert_response :success
  end

  test "should get show" do
    get api_submissions_show_url
    assert_response :success
  end

  test "should get create" do
    get api_submissions_create_url
    assert_response :success
  end

  test "should get update" do
    get api_submissions_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_submissions_destroy_url
    assert_response :success
  end

end
