$('nav a').bind('click', function() {
  $('nav a').removeClass('active');
  if (!$(this).parent().hasClass('title')) {
    $(this).addClass('active');
  }
});

$(function() {
  $('.main-inner > section > article').waypoint(function(event, direction) {
    if (direction === 'down') {
      $(window).scrollTop($(window).scrollTop() + 1);
    }
    var id = $(this).attr('id');
    $('.side-nav a').removeClass('inview');
    $('.side-nav a[href="#'+id+'"]').addClass('inview');
  });
});
