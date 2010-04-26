require 'spec_helper'

describe GameLevel do
  before(:each) do
    @valid_attributes = {
      :name => "value for name",
      :level_num => 1,
      :level_array_string => "value for level_array_string",
      :shortest_solution_string => "value for shortest_solution_string",
      :shortest_solution_player => "value for shortest_solution_player"
    }
  end

  it "should create a new instance given valid attributes" do
    GameLevel.create!(@valid_attributes)
  end
end
