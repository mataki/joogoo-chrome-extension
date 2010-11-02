$(document).ready(function() {
  jQuery.extend(
     {
       addService: function (service){
         var $service = $("#service_" + service["key"]);
         var $contents;
         if ($service.size() == 0) {
           $service = $("<div class='service' id='service_" + service["key"] + "'></div>");
           var $serviceName = $("<div class='service-name'></div>").html(service["name"]);
           $service.append($serviceName);
           $contents = $('<div class="contents"></div>');
           $service.append($contents);
         } else {
           $contents = $service.find(".contents");
         }
         $.each(service["news"], function(){
                  var $link = $('<a></a>').attr("target", "_blank").attr('href', this["targetUrl"]).html(this["title"] || this["createdAt"]);
                  var $title = $('<div class="title"></div>').append($link);
                  $contents.append($title);
                  if(this["content"]) {
                    var $content = $("<div class='content'></div>").html(this["content"]);
                    $contents.append($content);
                  }
                });

         return $service;
       }
     }
   );

   jQuery.fn.renderResponse = function(resp){
     var $news = $(this);
     $.each(resp, function(){
              $news.append($.addService(this));
            });
   };

   $("#news").renderResponse(chrome.extension.getBackgroundPage().getResponse());


});