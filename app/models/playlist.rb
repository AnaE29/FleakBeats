class Playlist < ApplicationRecord
  belongs_to :show
  has_many :tracks
end
