require 'spec_helper'

describe "/game_levels/show.html.erb" do
  include GameLevelsHelper
  before(:each) do
    assigns[:game_level] = @game_level = stub_model(GameLevel,
      :name => "value for name",
      :level_num => 1,
      :level_array_string => "value for level_array_string",
      :shortest_solution_string => "value for shortest_solution_string",
      :shortest_solution_player => "value for shortest_solution_player"
    )
  end

  it "renders attributes in <p>" do
    render
    response.should have_text(/value\ for\ name/)
    response.should have_text(/1/)
    response.should have_text(/value\ for\ level_array_string/)
    response.should have_text(/value\ for\ shortest_solution_string/)
    response.should have_text(/value\ for\ shortest_solution_player/)
  end
end
