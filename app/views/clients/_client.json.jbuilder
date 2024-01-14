json.extract! client, :id, :nickname, :first_name, :last_name, :address_id, :created_at, :updated_at
json.url client_url(client, format: :json)
