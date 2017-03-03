$(document).ready(function(){
  $('span').click(function(){
    $(this).addClass('selected').parent().addClass('selected');
  });
});
