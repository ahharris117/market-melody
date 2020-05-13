class Api::V1::FeedsController < ApplicationController
  def index
    if current_user
      currentUser = current_user
      currentUserLikes = Like.where(user_id: current_user.id)
    else
      currentUser = ''
      currentUserLikes = []
    end
    render json: {
      melodies: serialized_melodies,
      currentUser: currentUser,
      currentUserLikes: currentUserLikes
    }
  end

  private
  def serialized_melodies
    ActiveModelSerializers::SerializableResource.new(Melody.all, each_serializer: MelodyIndexSerializer)
  end
end
