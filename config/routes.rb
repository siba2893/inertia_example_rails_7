Rails.application.routes.draw do
  defaults export: true do
    root 'dashboard#index'

    devise_for :users, controllers: {
      registrations: 'users/registrations',
      passwords: 'users/passwords',
      confirmations: 'users/confirmations'
    }, skip: [:sessions]

    as :user do
      get 'login', to: 'users/sessions#new', as: :new_user_session
      post 'login', to: 'users/sessions#create', as: :user_session
      match 'logout', to: 'users/sessions#destroy', as: :destroy_user_session, via: Devise.mappings[:user].sign_out_via
    end
  end
end
