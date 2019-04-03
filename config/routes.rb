Rails.application.routes.draw do
  resources :choices
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    resources :quizzes do
        resources :questions
    end

    resources :users, only: :update

    resources :questions do
      resources :choices
    end
  end
end
