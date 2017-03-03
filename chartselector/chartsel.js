$(document).ready(function(){
  $('span').click(function(){
    var $this = $(this);
    var $parent = $this.parent();
    if(!$parent.hasClass('selected')){
      $parent.addClass('selected')
      $this.addClass('selected');
      var id = $this.attr('data-option');
      $('#'+id).show();
    }
  });
});
