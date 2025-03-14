class AssociationPlaylistTracks < ActiveRecord::Migration[7.1]
  def change
    add_reference :tracks, :playlist, foreign_key: true
  end
end
