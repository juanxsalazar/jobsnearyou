class GeocodeController < ApplicationController
  def lookup
    search = params[:search]

    results = Geocoder.search(search)
    
    render json: results.first.coordinates
  end
end
