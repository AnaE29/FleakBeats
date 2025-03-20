class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    @shows = Show.all
    @playlists = Playlist.all
    @favorites = user_signed_in? ? current_user.favorites : []
  end
end
