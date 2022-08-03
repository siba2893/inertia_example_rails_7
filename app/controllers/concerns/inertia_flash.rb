require 'active_support/concern'

module InertiaFlash
  extend ActiveSupport::Concern

  included do
    add_flash_types :success

    inertia_share errors: -> {
      session.delete(:errors) || []
    }

    inertia_share flash: -> {
      {
        notice: flash.notice,
        alert: flash.alert,
        success: flash[:success]
      }
    }
  end
end