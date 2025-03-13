class AddTmdbShows < ActiveRecord::Migration[7.1]
  def change
    add_column :shows, :tmdb_id, :integer, default: nil
  end
end
