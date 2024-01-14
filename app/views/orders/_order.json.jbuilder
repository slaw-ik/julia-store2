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
