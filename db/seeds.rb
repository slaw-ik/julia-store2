# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

ActiveRecord::Base.transaction do
  user = User.create!(first_name: 'John', last_name: 'Doe')

  item1 = Item.create!(name: 'Item 1', price: 10.0, stock_count: 10)
  item2 = Item.create!(name: 'Item 2', price: 20.0, stock_count: 20)
  item3 = Item.create!(name: 'Item 3', price: 30.0, stock_count: 30)

  address1 = Address.create!(country: 'UA', street: 'Street 1', city: 'City 1', region: 'Region 1',
                             building: 'Building 1')
  address2 = Address.create!(country: 'UA', street: 'Street 2', city: 'City 2', region: 'Region 2',
                             building: 'Building 2')
  address3 = Address.create!(country: 'UA', street: 'Street 3', city: 'City 3', region: 'Region 3',
                             building: 'Building 3')

  client1 = Client.create!(nickname: 'Client_1', first_name: 'Name 1', last_name: 'Last 1', address: address1,
                           email: 'client@one.com', phone: '1234567890')
  client2 = Client.create!(nickname: 'Client_2', first_name: 'Name 2', last_name: 'Last 2', address: address2,
                           email: 'client@two.com', phone: '0987654321')
  supplier = Supplier.create!(name: 'Supplier 1', address: address3, email: 'supplier@suppl.com', phone: '4561327890')

  # order1 = ClientOrder.create!(user: user, client: client1)
  # OrderItem.create!(order: order1, item: item1, count: 1)
  # OrderItem.create!(order: order1, item: item2, count: 2)

  # order2 = ClientOrder.create!(user: user, client: client2)
  # OrderItem.create!(order: order2, item: item2, count: 1)
  # OrderItem.create!(order: order2, item: item3, count: 2)

  order3 = SupplierOrder.create!(user:, supplier:)
  OrderItem.create!(order: order3, item: item1, count: 10)

  30.times do |i|
    order = ClientOrder.create!(user:, client: [client1, client2].sample)
    (1..5).to_a.sample.times do
      OrderItem.create!(order:, item: [item1, item2, item3].sample, count: rand(1..10))
    end

    puts "Order #{i} created"
  end
end
