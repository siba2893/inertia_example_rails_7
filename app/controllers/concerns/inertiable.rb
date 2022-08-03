require 'active_support/concern'

module Inertiable
  extend ActiveSupport::Concern

  def redirect_to(options = {}, response_options = {})
    if (errors = response_options.delete(:errors))
      session[:errors] = errors
    end

    super(options, response_options)
  end
end