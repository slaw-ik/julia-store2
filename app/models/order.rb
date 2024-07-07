# == Schema Information
#
# Table name: orders
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  supplier_id :bigint
#  client_id   :bigint
#  type        :string           not null
#  state       :string           default("pending"), not null
#  total       :decimal(10, 2)   default(0.0), not null
#  country     :string
#  city        :string
#  region      :string
#  street      :string
#  post_code   :string
#  building    :string
#  flat        :string
#  note        :string
#  phone       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Order < ApplicationRecord

  ORDER_STATES = {
    pending: 'pending',
    delivered: 'delivered',
    canceled: 'canceled',
  }.freeze

  enum state: ORDER_STATES

  belongs_to :user
  belongs_to :supplier, optional: true
  belongs_to :client, optional: true

  has_many :order_items
  has_many :items, through: :order_items
  has_many :order_histories

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
