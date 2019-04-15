require 'test_helper'

class GeocodeControllerTest < ActionDispatch::IntegrationTest
  test "should get lookup" do
    get geocode_lookup_url
    assert_response :success
  end

end
