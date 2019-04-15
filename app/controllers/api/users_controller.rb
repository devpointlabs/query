class Api::UsersController < ApplicationController
  before_action :authenticate_user!
  
  def update
    user = User.find(params[:id])
    user.name = params[:name] ? params[:name] : user.name
    user.email = params[:email] ? params[:email] : user.email
    
    file = params[:file]
    
    if file != ""
      Tinify.key = ENV["TINY_PNG"]
      image_name = params.keys.first
      source = Tinify.from_file(file.tempfile)
      source.to_file(image_name)
      begin
        cloud_image = Cloudinary::Uploader.upload(image_name, public_id: file.original_filename, secure: true)
        user.image = cloud_image['secure_url']
        File.delete(image_name) if File.exists?(image_name)
      rescue
        # render json: { errors: e }, status: 422
      end
    end
    
    if user.save
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: 422
    end
  end

end

