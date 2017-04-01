
jQuery(document).ready(function(){
  console.log(data);

  //<button type="button" class="q btn btn-default">Button</button> 
  var stack = [];
  var cur = data;
  var $text = jQuery('#text');
  var $btns = jQuery('#btns');
  var update = function(){
    $text.text(cur.q);
    $btns.html('');
    for (var key in cur.o) {
        console.log(key + " -> " + cur.o[key]);
        $btns.append('<button type="button" class="q btn btn-default">'+key+'</button>');
    }
  }
  update();
  $(document).on("click", ".q", function(event){
    alert($(this).text());
  });
  
  
});
