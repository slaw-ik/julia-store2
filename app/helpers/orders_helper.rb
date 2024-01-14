module OrdersHelper
  def state_color(state)
    case state
    when 'pending'
      '#ffc107'
    when 'delivered'
      '#28a745'
    when 'canceled'
      '#dc3545'
    end
  end
end
