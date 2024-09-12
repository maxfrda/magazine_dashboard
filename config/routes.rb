Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :magazines do
    resources :issues, only: [:create, :update, :destroy]
  end
  

end
