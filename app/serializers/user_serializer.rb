class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_photo, :scope

  has_many :melodies

  def current_user
    scope
  end
end
