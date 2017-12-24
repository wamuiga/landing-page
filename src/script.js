try {
  var credentials = require("./credentials");
} catch (error) {
  console.log(Error)
}

/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  // $('.js-geolocation').show(); 
  navigator.geolocation.getCurrentPosition(function (position) {
    loadWeather(position.coords.latitude + ',' + position.coords.longitude); //load weather using your lat/lng coordinates
  });
} else {
  alert("Your browser does not support geolocation!")
}
/* Where in the world are you? */
$('.js-geolocation').on('click', function () {});
$(document).ready(function () {
  $('#modal').modal('show');
  loadWeather('', ''); //@params location, woeid
  $('#calendar').fullCalendar({
    googleCalendarApiKey: "",
    events: {
      googleCalendarId: ""
    },
    height: 380,
    // themeSystem: 'jquery-ui',
    buttonIcon: {
      prev: 'glyphicon-menu-left',
      next: 'glyphicon-menu-right',
      prevYear: 'glyphicon-menu-left',
      nextYear: 'glyphicon-menu-right'
    },
    customButtons: {
      prev_month: {
        text: 'Previous',
        icon: 'glyphicon-menu-left',
        themeIcon: {
          prev: 'left-single-arrow',
          next: 'right-single-arrow',
          prevYear: 'left-double-arrow',
          nextYear: 'right-double-arrow'
        },
        click: function () {
          $('#calendar').fullCalendar('prev');
        }
      },
      next_month: {
        text: 'Next',
        icon: 'arrow_forward',
        click: function () {
          $('#calendar').fullCalendar('next');
        }
      },
      current_date: {
        text: 'Today',
        icon: 'today',
        click: function () {
          $('#calendar').fullCalendar('today');
        }
      }
    },

    header: {
      left: 'prev',
      center: 'title',
      right: 'next'
    }
  })
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'c',
    success: function (weather) {
      html = '<h3><i class="icon-' + weather.code + '"></i></h3>'
      html += '<h3>' + weather.temp + '&deg;' + weather.units.temp + ' &bull; ' + weather.alt.temp + '&deg;F</h3>'
      html += '<h3>' + weather.currently + '</h3>'
      html += '<h3>' + weather.city + '</h3>'
      $("#weather").html(html);
    },
    error: function (error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
}