class CreateGameLevels < ActiveRecord::Migration
  def self.up
    create_table :game_levels do |t|
      t.string :name
      t.integer :level_num
      t.string :level_array_string
      t.string :shortest_solution_string
      t.string :shortest_solution_player

      t.timestamps
    end
  end

  def self.down
    drop_table :game_levels
  end
end
