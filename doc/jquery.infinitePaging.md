jquery.infinitePaging
=====================

jQuery infinitePaging plugin will trigger a user defined function to retrieve the next set of data when the bottom of a given are is reached. Use this to load large datasets in chunks without sacrificing the user experience.


Usage
-----


    $("#container").infinitePaging({
        nextPage: function(container) {
            // retrieve some data...
            container.showNextPage("some data");
            container.isLastPage(); // Set this as the last page
        }
    });


Options
-------

-   **nextPage**        :   *Function. __REQUIRED__. Default=null* <br />
                            A function that will be called when new page is needed. Function will be given a scope (this keyword) of the original container and one input parameter: an object containing two methods - `showNextPage()` and `isLastPage()`. These methods must be used when the next page of data is ready to be displayed. <br /> The `showNextPage()` should always be called, even if there is no more data to be shown. This will ensure that the proper state is set on the UI.  The `isLastPage()` method should be called when there are no more pages of content to be displayed. This method sets the infinitePaging *pause* to true. This can be reset programmatically by calling the 'pause' method (see below). _(Tip: jQuery's .fadeIn() animation is called on each page to be inserted. Set the display css atribute to "none" to animate see the effect.)_

    
        nextPage: function(page){
            //... do some processing to get data.
            page.isLastPage();//mark this as the last page. Pauses the infinitePaging plugin.
            page.nextPage('html content here|jQuery|HTMLNodes')
        }
    
-   **bottomOffset**    :   *Integer. Optional. Default=200* <br />
                            The minimum distance from the bottom of the scrolling element before the next page is retrieved.

-   **loading**         :   *String|HTMLNode|jQuery. Optional. Default=`"<div>Loading....<div>"`* <br />
                            The markup to be inserted at the bottom of the container while additinal data is retrieved and loaded. This value is cloned everytime a page is loaded.

-   **viewport**        :   *HTMLNode, jQuery. Optional. Default=window* <br />
                            The scrolling element (ex. window) that will be watched in order to determine when to retrieve the next page. Set this to an element containing a css fixed `height` and `overflow` set to trigger paging inside DOM elements.



Methods
-------


### $().infinitePaging("pause"[, Boolean])

Determine if the Infinite Paging is paused or set pause on/off.

Example: Is paging paused

    $("#container").infinitePaging("pause"); // Return Boolean: true or false.

Example: Pause infinite paging

    $("#container").infinitePaging("pause", true); // returns $("#container") (chainable) 

Example: Resume infinite paging

    $("#container").infinitePaging("pause", false); // returns $("#container") (chainable) 



HTML Markup Tips
----------------

### DOM Elements

When using this plugin on scrollable DOM elements, it is best to have the HTML setup so that the scrolling element only has one relative positioned child element. All content should then be inside that one child element. 

**Example**

    <div id="viewport" style="height: 400px; width: 200px; overflow: auto;">
        <div id="viewportContent">
            
            <!-- all your content here -->
            
        </div>
    </div>

The following would set infinitePaging on the above example:

    $("#viewportContent").infinitePaging({
        nextPage: function(page) {
            // do some stuff to get the next page.
            page.showNextPage(someData);
        },
        viewport: $("#viewport")
    });


License
-------

Release under the terms of the [MIT](http://www.opensource.org/licenses/mit-license.php) License.

*Copyright 2012 [Paul Tavares](http://paultavares.wordpress.com/). All rights reserved.*

