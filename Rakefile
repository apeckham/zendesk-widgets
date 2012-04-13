task :default do
  sh "open SpecRunner.html"
end

task :admin do
  puts <<HTML
<div id="admin-element"></div>

<script type="text/javascript">
  new Urban.Admin($("admin-element"));
</script>
HTML
end