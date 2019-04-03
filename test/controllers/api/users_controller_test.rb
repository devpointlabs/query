require 'test_helper'

class Api::UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get update" do
    get api_users_update_url
    assert_response :success
  end

end
