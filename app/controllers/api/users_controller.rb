class Api::UsersController < ApplicationController
  def update
    user = User.find(params[:id])
    user.name = params[:name] ? params[:name] : user.name
    user.email = params[:email] ? params[:email] : user.email
    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end  
  end
end
