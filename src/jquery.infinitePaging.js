/**
 * jquery.infinitePaging.js
 * A jQuery plugin providing endless paging (infinite scrolling)
 * capabilities on any page element. 
 * 
 * Created by Paul Tavares on 2012-10-20.
 * Copyright 2012 Paul Tavares. All rights reserved.
 * Licensed under MIT
 * 
 */
;(function($){
    
    /**
     * @property
     * List of viewports that have infinite paging bound on them.
     */
    var viewports = {};
    
    /**
     * Function bound to viewport's scroll event. Loops through
     * the list of elements that needs to be sticked for the
     * given viewport.
     * "this" keyword is assumed to be the viewport.
     * 
     * @param {eventObject} jQuery's event object.
     * 
     * @return {Object} The viewport (this keyword)
     * 
     */
    function processElements(ev) {
        
        var elements = viewports[$(this).prop("infinitepaging")];
        
        // Loop through all elements and call the associated
        // nexPage method if the page scrolling has reached
        /// the associated trigger number.
        for(var i=0,j=elements.length; i<j; i++){
            var o = elements[i];
            if (!o.isPaused && !o.isBusy) {
                
                var docH = 0,
                    winH = o.viewport.outerHeight(),
                    winT = o.viewport.scrollTop();
                
                // if the viewport is the window, then use document
                if (o.viewport[0].self === window) {
                    docH = $(window.document).outerHeight();
                
                // Else, use the children of the viewport. (hopefully
                // they are all relative positioned.)
                } else {
                   o.viewport.children().each(function(){
                       docH += $(this).outerHeight();
                   });
                }
                
                if (winT >= (docH - (winH + o.bottomOffset))) {
                    o.isBusy = true;
                    var msg = $(o.loading).clone().appendTo(o.ele);
                    
                    // Call the function defined by the user and give it
                    // an object with the methods that control what to do
                    // next.
                    o.nextPage.call(o.ele, {
                        showNextPage: function(c){
                            var n = $(c).appendTo(o.ele);
                            msg.fadeOut("fast", function(){
                                n.fadeIn("slow");
                                o.isBusy = false;
                                msg.remove();
                            });
                        },
                        isLastPage: function(){
                            o.isPaused = true;
                        }
                    });
                }//end: if(): scroll position reached.
                
            }//end: if(): isPaused? or isBusy?
        }//end: for();
    
    }//end: processElements()
    
    /**
     * Turns the selected element into an infinite paging element.
     * 
     * @param {Object} options
     * 
     * @return {jQuery} this
     */
    $.fn.infinitePaging = function(options){
        
        var args = arguments;
        
        return this.each(function(){
            var viewportKey = "";
            if ($(this).hasClass("has-infinitepaging") && typeof args[0] !== "string") {
                return this;
            
            // Methods
            } else if ($(this).hasClass("has-infinitepaging") && typeof args[0] === "string") {
                var key
                switch (args[0].toLowerCase()) {
                    case "pause":
                        
                        viewportKey = $(this).prop("infinitepaging");
                        
                        for(var i=0,j=viewports[viewportKey].length; i<j; i++){
                            if (viewports[viewportKey][i].ele[0] === this){
                                // If we have a second argument, then set it
                                if (typeof args[1] === "boolean") {
                                    viewports[viewportKey][i]
                                        .isPaused = Boolean(args[1]);
                                // Else, return the current value for the isPaused attribute
                                } else {
                                    return viewports[viewportKey][i].isPaused;
                                }
                            }
                        };
                         
                        break;
                }
                return this;
            }
            
            var o   = $.extend({}, {
                        bottomOffset:   200,
                        nextPage:       null,
                        loading:        '<div>Loading....<div>',
                        viewport:       window,
                    }, options);
            
            o.ele           = $(this).addClass("has-infinitepaging"),
            o.viewport      = $(o.viewport),
            o.isPaused      = false,
            o.isBusy        = false,
            viewportKey     = o.viewport.prop("infinitepaging");
            
            // If this viewport is not yet defined, set it up now 
            if (!viewportKey) {
                
                viewportKey = "infinitepaging" + String(Math.random()).replace(/\D/g,""); 
                o.viewport.prop("infinitepaging", viewportKey);
                viewports[viewportKey] = [];
                o.viewport.on("scroll.infinitepaging", processElements);

            }
            
            // Add reference to the viewport id to the element
            o.ele.prop("infinitepaging", viewportKey);
            
            // Push this element's data to this view port's array
            viewports[viewportKey].push(o);
            
        });//end: each()
    };//end
    
})(jQuery);