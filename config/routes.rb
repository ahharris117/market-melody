Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  resources :melodies, only: [:show, :new, :create, :index]
  resources :users, only: [:show]

  namespace :api do
    namespace :v1 do
      resources :melodies, only: [:index, :create, :show, :destroy, :update]
      resources :scales, only: [:index]
      resources :stocks, only: [:index]
      resources :users, only: [:index, :show]
      resources :feeds, only: [:index]
      resources :likes, only: [:create, :destroy]
    end
  end
end
