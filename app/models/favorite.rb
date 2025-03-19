class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :track

  after_commit :favorites_user_update, on: [:create, :update, :destroy]

  def favorites_user_update
    broadcast_update_to "favorites_#{user_id}", target: "favorites", partial: "shared/favorites", locals: { favorites: user.favorites }
  end
end
