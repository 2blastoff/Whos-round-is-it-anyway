class GroupsController < ApplicationController
  skip_before_filter  :verify_authenticity_token

  def group_params
    params.require(:group).permit(:name, {user_ids: [] })
  end

  def create
    group = Group.create(group_params)
    render json: group.as_json(include: :users), status: 201
  end

  def show
    group = Group.find(params[:id])
    render json: group.as_json(include: :users)
  end

  def payer
    group = Group.find(params[:id])
    user = group.current_payer
    render json: user.as_json(only: [:id, :email, :username])
  end
end
