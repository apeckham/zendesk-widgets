$j(document).bind('keydown', 'alt+1', function(){
  $j("#ticket_status_id").val(1);
});

$j(document).bind('keydown', 'alt+2', function(){
  $j("#ticket_status_id").val(2);
});

$j(document).bind('keydown', 'alt+3', function(){
  $j("#ticket_status_id").val(3);
});

$j(document).bind('keydown', 'alt+c', function(){
  $j("#comment_value").focus();
  return false;
});

$j(document).bind('keydown', 'esc', function(){
  $j("#comment_value").blur();
  return false;
});