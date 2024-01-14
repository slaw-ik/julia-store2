class Client < ApplicationRecord
  belongs_to :address, required: true

  def name
    "#{first_name} #{last_name}"
  end

  def full_address
    address.full_address
  end
end
