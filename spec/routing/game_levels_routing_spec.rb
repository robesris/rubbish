require 'spec_helper'

describe GameLevelsController do
  describe "routing" do
    it "recognizes and generates #index" do
      { :get => "/game_levels" }.should route_to(:controller => "game_levels", :action => "index")
    end

    it "recognizes and generates #new" do
      { :get => "/game_levels/new" }.should route_to(:controller => "game_levels", :action => "new")
    end

    it "recognizes and generates #show" do
      { :get => "/game_levels/1" }.should route_to(:controller => "game_levels", :action => "show", :id => "1")
    end

    it "recognizes and generates #edit" do
      { :get => "/game_levels/1/edit" }.should route_to(:controller => "game_levels", :action => "edit", :id => "1")
    end

    it "recognizes and generates #create" do
      { :post => "/game_levels" }.should route_to(:controller => "game_levels", :action => "create") 
    end

    it "recognizes and generates #update" do
      { :put => "/game_levels/1" }.should route_to(:controller => "game_levels", :action => "update", :id => "1") 
    end

    it "recognizes and generates #destroy" do
      { :delete => "/game_levels/1" }.should route_to(:controller => "game_levels", :action => "destroy", :id => "1") 
    end
  end
end
