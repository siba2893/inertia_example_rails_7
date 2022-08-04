class ApplicationController < ActionController::Base
  # include Auth
  include InertiaCsrf
  include InertiaFlash
  include InertiaJson
  include Inertiable

  before_action :deep_underscore_params!

  def deep_underscore_params!(app_params = params)
    HashTransformer.snake_case(app_params, mutable: true)
  end
end
