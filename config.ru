require 'sinatra'

get '/all.js' do
  content_type 'text/javascript'
  
  out = Dir.glob("public/*.js").collect { |file| File.read(file) }.join
  out << "\ndocument.fire('urban:load');"
end

run Sinatra::Application