class CreatePlaylists < ActiveRecord::Migration[7.1]
  def change
    create_table :playlists do |t|
      t.string :name
      t.references :show, null: false, foreign_key: true
      t.boolean :original

      t.timestamps
    end
  end
end
