class DashboardController < ApplicationController
  def index
    render inertia: 'dashboard/Index', props: { name: 'Daniel' }
  end
end
