# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20100427222815) do

  create_table "game_levels", :force => true do |t|
    t.string   "name"
    t.integer  "level_num"
    t.string   "level_array_string"
    t.string   "shortest_solution_string"
    t.string   "shortest_solution_player"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "before_text"
    t.string   "after_text"
    t.integer  "kratos_health"
    t.string   "created_by"
    t.string   "edit_code"
  end

end
