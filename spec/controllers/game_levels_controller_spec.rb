require 'spec_helper'

describe GameLevelsController do

  def mock_game_level(stubs={})
    @mock_game_level ||= mock_model(GameLevel, stubs)
  end

  describe "GET index" do
    it "assigns all game_levels as @game_levels" do
      GameLevel.stub(:find).with(:all).and_return([mock_game_level])
      get :index
      assigns[:game_levels].should == [mock_game_level]
    end
  end

  describe "GET show" do
    it "assigns the requested game_level as @game_level" do
      GameLevel.stub(:find).with("37").and_return(mock_game_level)
      get :show, :id => "37"
      assigns[:game_level].should equal(mock_game_level)
    end
  end

  describe "GET new" do
    it "assigns a new game_level as @game_level" do
      GameLevel.stub(:new).and_return(mock_game_level)
      get :new
      assigns[:game_level].should equal(mock_game_level)
    end
  end

  describe "GET edit" do
    it "assigns the requested game_level as @game_level" do
      GameLevel.stub(:find).with("37").and_return(mock_game_level)
      get :edit, :id => "37"
      assigns[:game_level].should equal(mock_game_level)
    end
  end

  describe "POST create" do

    describe "with valid params" do
      it "assigns a newly created game_level as @game_level" do
        GameLevel.stub(:new).with({'these' => 'params'}).and_return(mock_game_level(:save => true))
        post :create, :game_level => {:these => 'params'}
        assigns[:game_level].should equal(mock_game_level)
      end

      it "redirects to the created game_level" do
        GameLevel.stub(:new).and_return(mock_game_level(:save => true))
        post :create, :game_level => {}
        response.should redirect_to(game_level_url(mock_game_level))
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved game_level as @game_level" do
        GameLevel.stub(:new).with({'these' => 'params'}).and_return(mock_game_level(:save => false))
        post :create, :game_level => {:these => 'params'}
        assigns[:game_level].should equal(mock_game_level)
      end

      it "re-renders the 'new' template" do
        GameLevel.stub(:new).and_return(mock_game_level(:save => false))
        post :create, :game_level => {}
        response.should render_template('new')
      end
    end

  end

  describe "PUT update" do

    describe "with valid params" do
      it "updates the requested game_level" do
        GameLevel.should_receive(:find).with("37").and_return(mock_game_level)
        mock_game_level.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :game_level => {:these => 'params'}
      end

      it "assigns the requested game_level as @game_level" do
        GameLevel.stub(:find).and_return(mock_game_level(:update_attributes => true))
        put :update, :id => "1"
        assigns[:game_level].should equal(mock_game_level)
      end

      it "redirects to the game_level" do
        GameLevel.stub(:find).and_return(mock_game_level(:update_attributes => true))
        put :update, :id => "1"
        response.should redirect_to(game_level_url(mock_game_level))
      end
    end

    describe "with invalid params" do
      it "updates the requested game_level" do
        GameLevel.should_receive(:find).with("37").and_return(mock_game_level)
        mock_game_level.should_receive(:update_attributes).with({'these' => 'params'})
        put :update, :id => "37", :game_level => {:these => 'params'}
      end

      it "assigns the game_level as @game_level" do
        GameLevel.stub(:find).and_return(mock_game_level(:update_attributes => false))
        put :update, :id => "1"
        assigns[:game_level].should equal(mock_game_level)
      end

      it "re-renders the 'edit' template" do
        GameLevel.stub(:find).and_return(mock_game_level(:update_attributes => false))
        put :update, :id => "1"
        response.should render_template('edit')
      end
    end

  end

  describe "DELETE destroy" do
    it "destroys the requested game_level" do
      GameLevel.should_receive(:find).with("37").and_return(mock_game_level)
      mock_game_level.should_receive(:destroy)
      delete :destroy, :id => "37"
    end

    it "redirects to the game_levels list" do
      GameLevel.stub(:find).and_return(mock_game_level(:destroy => true))
      delete :destroy, :id => "1"
      response.should redirect_to(game_levels_url)
    end
  end

end
