class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]
  skip_before_filter  :verify_authenticity_token
  clear_respond_to
  respond_to :json

  # def create
  #   @user = current_user
  #   render json: @user.as_json(only: [:id, :email, :username], include: :groups)
  # end

  def destroy
    sign_out
    render json: {success: 'true'}, status: 200
  end

  def create
    resource = User.find_for_database_authentication(:email => params[:user][:email])
    if resource.nil?
      render :json=> {:success => 0, :error => "No Such User"}, :status=>401
    else
      if resource.valid_password?(params[:user][:password])
        sign_in(:user, resource)
        @user = current_user
        render json: @user.as_json(only: [:id, :email, :username], include: :groups)
      else
        render :json=> {:success => 0, :error => "Wrong Password"}, :status=>401
      end
    end
  end
end
