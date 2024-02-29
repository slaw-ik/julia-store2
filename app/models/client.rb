# == Schema Information
#
# Table name: clients
#
#  id         :bigint           not null, primary key
#  nickname   :string
#  first_name :string
#  last_name  :string
#  email      :string
#  phone      :string
#  address_id :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Client < ApplicationRecord
  belongs_to :address, required: true

  scope :page, ->(page) { limit(10).offset((page - 1) * 10) }

  def name
    "#{first_name} #{last_name}"
  end

  def full_address
    address.full_address
  end
end
