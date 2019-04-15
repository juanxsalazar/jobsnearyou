class Business < ApplicationRecord
    has_many :jobs
    geocoded_by :address
    after_validation :geocode

end
