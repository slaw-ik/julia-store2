class Order < ApplicationRecord
  enum state: {
    pending: 'pending',
    delivered: 'delivered',
    canceled: 'canceled',
  }

  belongs_to :user
  belongs_to :supplier, optional: true
  belongs_to :client, optional: true

  has_many :order_items
  has_many :items, through: :order_items

  def update_total(order_item = nil)
    total = 0
    if order_item
      total = order_item.total
    end
    
    update(total: order_items.map(&:total).sum + total)
  end

  def full_address
    full_order_address || client&.full_address || supplier&.full_address
  end

  private

  def full_order_address
    return nil unless country.present? || city.present? || region.present? || street.present? || building.present?

    [street, building, flat, city, region, post_code, country].filter(&:present?).join(", ")
  end
end
