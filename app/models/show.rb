class Show < ApplicationRecord
  has_one :playlist, dependent: :destroy
end
