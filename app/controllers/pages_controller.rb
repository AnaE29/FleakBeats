class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    if params[:search].present? && params[:search][:query].present?
      @shows = Show.search_by_name(params[:search][:query])
    else
      @shows = Show.all
    end
    @playlists = Playlist.all
    @favorites = user_signed_in? ? current_user.favorites : []
  end
end
