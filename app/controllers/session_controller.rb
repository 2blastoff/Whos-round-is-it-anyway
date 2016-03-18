class SessionController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def index
    if user_signed_in?
      @user = current_user
      render json: @user.as_json(only: [:id, :email, :username], include: :groups)
    else
      render json: {id: 0}
    end
  end
end
