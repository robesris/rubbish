class AddKratosHealthAndCreatedByAndEditCodeToGameLevels < ActiveRecord::Migration
  def self.up
    add_column :game_levels, :kratos_health, :integer
    add_column :game_levels, :created_by, :string
    add_column :game_levels, :edit_code, :string
  end

  def self.down
    remove_column :game_levels, :edit_code
    remove_column :game_levels, :created_by
    remove_column :game_levels, :kratos_health
  end
end
