class AddPosterShows < ActiveRecord::Migration[7.1]
  def change
    add_column :shows, :poster_url, :string
  end
end
