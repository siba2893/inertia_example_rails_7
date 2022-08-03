# Rails + Vite + Vue + Inertia

To enable SSR add the following code to `vite.json` at `/config`
````
"production": {
  "ssrBuildEnabled": true
}
````
To enable SSR add the following code to the InertiaInitializer at `/config/initializers/inertia_rails.rb`

`config.ssr_enabled = Rails.env.production?`

also update the Procfile with the following code

````
web: bin/vite ssr & bin/rails server -p $PORT -e $RAILS_ENV
release: rake db:migrate
````