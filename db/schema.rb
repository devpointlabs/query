# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_23_200426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "choices", force: :cascade do |t|
    t.string "answer"
    t.boolean "correct_answer"
    t.bigint "question_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["question_id"], name: "index_choices_on_question_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "name"
    t.bigint "quiz_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "qType"
    t.text "explanation"
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "info"
    t.boolean "active"
    t.string "end"
    t.boolean "anon"
    t.string "email"
  end

  create_table "student_lists", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "info"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_student_lists_on_user_id"
  end

  create_table "submission_choices", force: :cascade do |t|
    t.bigint "submission_id"
    t.bigint "choice_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "student_answer"
    t.index ["choice_id"], name: "index_submission_choices_on_choice_id"
    t.index ["submission_id"], name: "index_submission_choices_on_submission_id"
  end

  create_table "submissions", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "quiz_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "complete", default: false
    t.boolean "going", default: true
    t.index ["quiz_id"], name: "index_submissions_on_quiz_id"
    t.index ["user_id"], name: "index_submissions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.boolean "teacher"
    t.string "firstName"
    t.string "lastName"
    t.string "username"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["firstName"], name: "index_users_on_firstName"
    t.index ["lastName"], name: "index_users_on_lastName"
    t.index ["name"], name: "index_users_on_name"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["teacher"], name: "index_users_on_teacher"
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "choices", "questions"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "student_lists", "users"
  add_foreign_key "submission_choices", "choices"
  add_foreign_key "submission_choices", "submissions"
  add_foreign_key "submissions", "quizzes"
  add_foreign_key "submissions", "users"
end
