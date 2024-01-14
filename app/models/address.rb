class Address < ApplicationRecord
  has_one :client
  has_one :supplier

  def full_address
    [street, building, flat, city, region, post_code, country].filter(&:present?).join(", ")
  end
end
