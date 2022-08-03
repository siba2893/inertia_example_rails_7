class ApplicationController < ActionController::Base
  # include Auth
  include InertiaCsrf
  include InertiaFlash
  include InertiaJson
  include Inertiable
end
