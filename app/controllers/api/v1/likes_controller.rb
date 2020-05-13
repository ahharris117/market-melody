class Api::V1::LikesController < ApplicationController
  protect_from_forgery with: :null_session
  protect_from_forgery unless: -> { request.format.json? }

  def create
    Like.create(melody_id: params[:melody_id], user_id: params[:user_id])
    render json: {
      melodies: serialized_melodies,
      currentUser: current_user,
      currentUserLikes: Like.where(user_id: current_user.id)
    }
  end

  def destroy
    like = Like.find(params[:id])
    like.delete
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
