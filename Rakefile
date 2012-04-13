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

task :loader do
  puts <<END
function loadScript(src) {
  var script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
}
END
end