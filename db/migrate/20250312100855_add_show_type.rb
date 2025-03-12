class AddShowType < ActiveRecord::Migration[7.1]
  def change
    add_column :shows, :show_type, :string
  end
end
