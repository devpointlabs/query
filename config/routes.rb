Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :quizzes do
        resources :questions
    end

    post '/quizzes/:id/quiz', to: 'quizzes#take'

    resources :users, only: :update

    resources :questions do
      resources :choices
    end
  end


end
