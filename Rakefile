task :default do
  system("open spec/SpecRunner.html")
end

task :html do
  widget = ENV['WIDGET'] or raise "WIDGET is required"
  
  puts <<HTML
<div id="#{widget}-widget"><img src="http://zendesk-widgets.heroku.com/ajax-loader.gif"/></div>
<script type="text/javascript">
  Widget.require('http://' + window.WIDGET_HOST + '/#{widget}.js');
</script>
HTML
end