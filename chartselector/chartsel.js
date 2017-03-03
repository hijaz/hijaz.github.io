$(document).ready(function(){
  $('span').click(function(){
    var $this = $(this);
    var $parent = $this.parent();
    if(!$parent.hasClass('selected')){
      $parent.addClass('selected')
      $this.addClass('selected');
      var id = $this.attr('data-option');
      $('#'+id).show();
      scrollToThis(id);
    }
  });
});
var scrollToThis = function(id){
    $('html, body').animate({
        scrollTop: $("#"+id).offset().top
    }, 2000);
};
