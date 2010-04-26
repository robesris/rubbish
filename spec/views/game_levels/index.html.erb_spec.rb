require 'spec_helper'

describe "/game_levels/index.html.erb" do
  include GameLevelsHelper

  before(:each) do
    assigns[:game_levels] = [
      stub_model(GameLevel,
        :name => "value for name",
        :level_num => 1,
        :level_array_string => "value for level_array_string",
        :shortest_solution_string => "value for shortest_solution_string",
        :shortest_solution_player => "value for shortest_solution_player"
      ),
      stub_model(GameLevel,
        :name => "value for name",
        :level_num => 1,
        :level_array_string => "value for level_array_string",
        :shortest_solution_string => "value for shortest_solution_string",
        :shortest_solution_player => "value for shortest_solution_player"
      )
    ]
  end

  it "renders a list of game_levels" do
    render
    response.should have_tag("tr>td", "value for name".to_s, 2)
    response.should have_tag("tr>td", 1.to_s, 2)
    response.should have_tag("tr>td", "value for level_array_string".to_s, 2)
    response.should have_tag("tr>td", "value for shortest_solution_string".to_s, 2)
    response.should have_tag("tr>td", "value for shortest_solution_player".to_s, 2)
  end
end
