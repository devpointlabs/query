Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :quizzes do
        resources :questions
    end

    resources :users, only: :update

    resources :questions do
      resources :choices
    end

    resources :submissions do
      resources :submission_choices
    end
    post "add_student_to_quiz", to: "submissions#add_student_to_quiz"

    get "submissions_by_quiz", to: "submissions#submissions_by_quiz"
    get ":submission_id/student_choices", to: "submission_choices#index_with_choice_name"
    get "submissions/:id/get_grade", to: "submissions#get_grade"
  end
  
  
  get '*other', to: 'static#index'
end
