module ApplicationHelper
  def prettify_time(time)
    time.strftime('%d.%m.%Y %H:%M:%S')
  end
end
