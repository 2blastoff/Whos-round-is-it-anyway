class UsersController < ApplicationController

  def index
    render json: User.all.as_json(only: [:id, :email, :username])
  end

end
