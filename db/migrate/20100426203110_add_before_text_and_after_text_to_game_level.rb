class AddBeforeTextAndAfterTextToGameLevel < ActiveRecord::Migration
  def self.up
    add_column :game_levels, :before_text, :string
    add_column :game_levels, :after_text, :string
  end

  def self.down
    remove_column :game_levels, :after_text
    remove_column :game_levels, :before_text
  end
end
