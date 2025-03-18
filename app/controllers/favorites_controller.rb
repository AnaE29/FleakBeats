class FavoritesController < ApplicationController

  def toggle
    song_id = params[:song_id]
    favorite = current_user.favorites.find_by(track_id: Track.find_by(name: song_id).id)

    if favorite
      favorite.destroy
      render json: { status: 'removed' }
    else
      new_favorite = Favorite.create!(track: Track.find_by(name: song_id), user: current_user)
      if new_favorite.persisted?
        render json: { status: 'added', favorite_id: new_favorite.id }
      else
        render json: { status: 'error', errors: new_favorite.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

end
