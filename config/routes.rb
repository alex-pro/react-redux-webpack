require 'api_constraints'
require 'subdomain_constraints'

Rails.application.routes.draw do
  get '/auth/preflight', to: 'application#auth_preflight'

  namespace :api, defaults: { format: :json }, constraints: SubdomainConstraints.new(subdomain: 'api'), path: '/' do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      devise_for :users
      resources :users
    end
  end
end
