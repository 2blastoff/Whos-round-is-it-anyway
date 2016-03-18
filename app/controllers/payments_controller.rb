class PaymentsController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def payment_params
    params.require(:payment).permit(:amount, :user_id)
  end

  def create
    @group = Group.find(params[:group_id])
    @group.payments.create(payment_params)
    @user = @group.current_payer
    render json: @user.as_json(only: [:id, :email, :username])
  end
end
