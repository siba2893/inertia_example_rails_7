class DashboardController < ApplicationController
  before_action :authenticate_user!

  def index
    render inertia: 'dashboard/Index', props: { name: 'Daniel' }
  end
end
