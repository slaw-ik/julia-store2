json.extract! order, :id, :user_id, :supplier_id, :client_id, :type, :state, :total, :country, :city, :region, :street, :post_code, :building, :flat, :note, :created_at, :updated_at

json.fullAddress order.full_address

if order.is_a? ClientOrder
  json.name order.client.name
  json.nickname order.client.nickname
  json.email order.client.email
  json.phone order.client.phone
else
  json.name order.supplier.name
  json.email order.supplier.email
  json.phone order.supplier.phone
end

json.orderItems order.order_items do |order_item|
  json.extract! order_item, :id, :item_id, :order_id, :count, :price, :total, :created_at, :updated_at
  json.item do
    json.extract! order_item.item, :id, :name, :description, :price, :created_at, :updated_at
  end  
end