# == Schema Information
#
# Table name: suppliers
#
#  id         :bigint           not null, primary key
#  name       :string
#  email      :string
#  phone      :string
#  address_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Supplier < ApplicationRecord
  belongs_to :address, required: true

  validates :name, presence: true
  validates :address, presence: true

  def full_address
    address.full_address
  end
end
