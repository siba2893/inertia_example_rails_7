Rails.application.routes.draw do
  # Defines the root path route ("/")
  root 'dashboard#index', export: true
end
