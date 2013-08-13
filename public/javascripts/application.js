/*
  Add your application's coffee-script code here
*/


(function() {
  $(document).ready(function() {
    console.log('ready');
    return $('#get-next').click(function(e) {
      console.log('click');
      e.preventDefault();
      return $.ajax({
        dataType: 'json',
        url: '/application/index.json',
        success: function(data) {
          console.log(data);
          console.log(data.data.title);
          $('.reason-title').text(data.data.title);
          return $('.reason-rand').text(data.data.random);
        }
      });
    });
  });

}).call(this);
