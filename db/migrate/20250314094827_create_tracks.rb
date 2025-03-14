class CreateTracks < ActiveRecord::Migration[7.1]
  def change
    create_table :tracks do |t|
      t.string :name
      t.boolean :lofi
      t.string :artist
      t.string :url
      t.string :cover_art_url

      t.timestamps
    end
  end
end
