module ApplicationHelper
  def render_icon(icon, size: 24, color: nil)
    size ||= ""
    render "icons/#{icon}", size: size, color: color
  end
end
