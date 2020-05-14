class MelodyIndexSerializer < ActiveModel::Serializer
  attributes :id, :get_name, :get_melody, :created_at

  belongs_to :user
  has_many :likes
end
