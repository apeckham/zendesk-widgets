task :default do
  system("open SpecRunner.html")
end

task :html do
  widget = ENV['WIDGET'] or raise "WIDGET is required"
  class_name = widget[0..0].upcase + widget[1..-1]
  
  html = <<HTML
<div id="#{widget}-element">
<img src="http://zendesk-widgets.heroku.com/ajax-loader.gif" style="display: block; margin: 0 auto"/>
</div>

<script type="text/javascript">
new Urban.#{class_name}($("#{widget}-element"));
</script>
HTML
  
  IO.popen("pbcopy", "r+") { |out| out.print html }
  puts "Copied HTML to clipboard"
end