Rails.application.routes.draw do
  resources :users do
    get 'show_user_plan', on: :collection
  end
  resources :plans
  resources :forms
  resources :services do
    get 'show_by_code', on: :collection
  end
  resources :sessions
  resources :admin_users do
    get 'fetch_current_user', on: :collection
  end
  resources :companies do
    get 'show_by_code', on: :collection
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
