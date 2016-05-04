class Api::V1::UsersController < Api::V1::ApiController
  def index
    users = ActiveModel::ArraySerializer.new(User.all, each_serializer: UserSerializer)
    render json: users, status: :ok
  end
end
