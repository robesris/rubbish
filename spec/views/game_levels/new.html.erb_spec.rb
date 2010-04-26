require 'spec_helper'

describe "/game_levels/new.html.erb" do
  include GameLevelsHelper

  before(:each) do
    assigns[:game_level] = stub_model(GameLevel,
      :new_record? => true,
      :name => "value for name",
      :level_num => 1,
      :level_array_string => "value for level_array_string",
      :shortest_solution_string => "value for shortest_solution_string",
      :shortest_solution_player => "value for shortest_solution_player"
    )
  end

  it "renders new game_level form" do
    render

    response.should have_tag("form[action=?][method=post]", game_levels_path) do
      with_tag("input#game_level_name[name=?]", "game_level[name]")
      with_tag("input#game_level_level_num[name=?]", "game_level[level_num]")
      with_tag("input#game_level_level_array_string[name=?]", "game_level[level_array_string]")
      with_tag("input#game_level_shortest_solution_string[name=?]", "game_level[shortest_solution_string]")
      with_tag("input#game_level_shortest_solution_player[name=?]", "game_level[shortest_solution_player]")
    end
  end
end
