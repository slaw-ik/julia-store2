# frozen_string_literal: true

# == Schema Information
#
# Table name: order_items
#
#  id         :bigint           not null, primary key
#  item_id    :bigint           not null
#  order_id   :bigint           not null
#  count      :integer          default(0), not null
#  price      :decimal(10, 2)   default(0.0), not null
#  total      :decimal(10, 2)   default(0.0), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class OrderItem < ApplicationRecord
  belongs_to :item
  belongs_to :order

  validates :item, presence: true
  validates :order, presence: true
  validates :count, presence: true, numericality: { greater_than: 0 }

  before_save :set_price
  before_save :set_total
  after_create :set_orders_total
  after_update :refresh_orders_total

  private

  def set_price
    self.price = item.price if price.zero?
  end

  def set_total
    self.total = count * price
  end

  def set_orders_total
    order.update_total(self)
  end

  def refresh_orders_total
    order.update_total
  end
end
