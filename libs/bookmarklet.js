/* @author: Xavier Damman (@xdamman) - http://github.com/xdamman/selection-sharer - @license: MIT */
!function ()
{
	var a = "//xdamman.github.com/selection-sharer/lib/selection-sharer/dist",
	    b = document.createElement("link");
	b.rel = "stylesheet", b.href = "css/styles.css", document.head.appendChild(b);
	var c = function ()
	    {
		    var b = document.createElement("script");
		    b.src = "libs/selection-sharer.js", b.onload = d, document.body.appendChild(b)
	    },
	    d = function ()
	    {
		    var a = new SelectionSharer;
		    a.show(), a.setElements("p")
	    };
	if ("function" != typeof jQuery)
	{
		var e = document.createElement("script");
		//e.src = "http://code.jquery.com/jquery-latest.js", e.onload = c, document.body.appendChild(e)
	}
	else
	{
		c()
	}
}();
