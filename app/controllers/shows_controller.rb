class ShowsController < ApplicationController

  def autocomplete
    query = params[:query]
    shows = Show.where("name ILIKE ?", "%#{query}%").limit(10)
    render json: shows.as_json(only: [:id, :name])
  end

end
