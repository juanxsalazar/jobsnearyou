Rails.application.routes.draw do
  scope :api do
    get 'geocode/lookup'
    resources :businesses do 
      resources :jobs
    end
  end
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
