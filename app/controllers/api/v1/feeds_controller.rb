class Api::V1::FeedsController < ApplicationController
  def index
    render json: {
      melodies: serialized_melodies,
      currentUser: current_user,
      currentUserLikes: Like.where(user_id: current_user.id)
    }
  end

  private
  def serialized_melodies
    ActiveModelSerializers::SerializableResource.new(Melody.all, each_serializer: MelodyIndexSerializer)
  end
end
