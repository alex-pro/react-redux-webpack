class Api::V1::ApiController < ActionController::Metal
  abstract!
  include AbstractController::Callbacks
  include ActionController::StrongParameters
  include Api

  private

  def render(options = {})
    self.status = options[:status] || 200
    self.content_type = 'application/json'
    body = Oj.dump(options[:json], mode: :compat)
    self.headers['Content-Length'] = body.bytesize.to_s
    self.response_body = body
  end

  ActiveSupport.run_load_hooks(:action_controller, self)
end
