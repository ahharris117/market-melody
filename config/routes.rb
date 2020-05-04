Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :melodies, only: [:show, :new, :create]
  
  namespace :api do
    namespace :v1 do
      resources :melodies, only: [:create]
      resources :scales, only: [:index]
    end
  end
end
