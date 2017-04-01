
jQuery(document).ready(function(){
  console.log(data);

  //		<button type="button" class="q btn btn-default">Button</button> 

  $(document).on("click", ".q", function(event){
    alert($(this).text());
  });
});
