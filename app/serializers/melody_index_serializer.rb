class MelodyIndexSerializer < ActiveModel::Serializer
  attributes :id, :get_name, :get_melody, :created_at

  has_many :likes
end
