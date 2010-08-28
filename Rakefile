task :test do
  system("open SpecRunner.html")
end

task :default do
  ZendeskUpdater.update_widget(193100, html_for('admin'))
  ZendeskUpdater.update_widget(197779, html_for('map'))
  ZendeskUpdater.update_widget(199606, html_for('random'))
  ZendeskUpdater.update_widget(193142, all_html)
end

require 'httparty'

def html_for(widget)
  class_name = widget[0..0].upcase + widget[1..-1]

  <<HTML
<div id="#{widget}-element">
  <img src="http://static.blog.urbandictionary.com.s3.amazonaws.com/zendesk-ajax-loader.gif" style="display: block; margin: 0 auto"/>
</div>

<script type="text/javascript">
  new Urban.#{class_name}($("#{widget}-element"));
</script>
HTML
end

def all_html
  files = Dir.glob("javascript/*.js")
  files << "lib/jquery.hotkeys.js"
  files.collect { |file| File.read(file) }.join
end

class ZendeskUpdater
  include HTTParty
  base_uri "http://support.urbandictionary.com/"
  basic_auth "aaron@urbandictionary.com", "vedd6un1en"
  
  def self.update_widget(id, content)
    puts "updating widget #{id} with #{content[0..60].inspect}..."
    response = post("/widgets/#{id}", :body => {:widget => {:content => content}, "_method" => "put", "submit_type" => "update_widget"})
    raise unless response.body =~ %r{<title>\s+Urban Dictionary : Widgets\s+</title>}m
  end
end