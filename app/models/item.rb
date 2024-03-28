# == Schema Information
#
# Table name: items
#
#  id          :bigint           not null, primary key
#  name        :string           not null
#  description :string
#  count       :integer          default(0), not null
#  price       :decimal(10, 2)   default(0.0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Item < ApplicationRecord
  has_many :order_items
  has_many :orders, through: :order_items

  def self.search(search)
    if search.present?
      where('name ILIKE ? OR description ILIKE ?', "%#{search}%", "%#{search}%")
    else
      []
    end
  end
end
