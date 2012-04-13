task :default do
  sh "open SpecRunner.html"
end

task :admin do
  puts <<HTML
<div id="admin-element">
  <img src="http://static.blog.urbandictionary.com.s3.amazonaws.com/zendesk-ajax-loader.gif" style="display: block; margin: 0 auto"/>
</div>

<script type="text/javascript">
  new Urban.Admin($("admin-element"));
</script>
HTML
end

task :all_html do
  files = Dir.glob("javascript/*.js")
  files << "lib/jquery.hotkeys.js"
  puts files.collect { |file| File.read(file) }.join
end