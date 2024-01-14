class Supplier < ApplicationRecord
  belongs_to :address, required: true

  validates :name, presence: true
  validates :address, presence: true

  def full_address
    address.full_address
  end
end
