json.orders  do 
  json.array! @client_orders, partial: "orders/order", as: :order
end
json.total @client_orders.size
json.page @page || 1