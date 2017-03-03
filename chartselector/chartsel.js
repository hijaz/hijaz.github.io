$(document).ready(function(){
  $('span').click(function(){
    $(this).addclass('selected').parent().addClass('selected');
  });
});
