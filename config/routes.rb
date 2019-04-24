Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  
  namespace :api do
    resources :quizzes do
      resources :questions
    end
    
    resources :student_lists
    
    resources :users, only: :update

    resources :questions do
      resources :choices
    end

    resources :submissions do
      resources :submission_choices
    end
    post "add_student_to_quiz", to: "submissions#add_student_to_quiz"
    get "studsub", to: "quizzes#substuff"
    patch "stop/:id", to: "quizzes#stop"
    # get submission date/time
    get "submitted/:submission_id", to: "submission_choices#submitted_time"
    get "submissions_by_quiz", to: "submissions#submissions_by_quiz"
    get ":submission_id/student_choices", to: "submission_choices#index_with_choice_name"
    get "submissions/:id/get_grade", to: "submissions#get_grade"
    patch "submit_quiz", to: "submissions#submit_quiz"
  end
  
  
  get '*other', to: 'static#index'
end
