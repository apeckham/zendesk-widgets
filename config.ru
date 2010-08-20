require 'sinatra'

get '/all.js' do
  content_type 'text/javascript'
  Dir.glob("public/*.js").collect { |file| File.read(file) }.join
end

run Sinatra::Application