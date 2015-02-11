Tim questions
-------------
+ Titles of sections (I'd take away Overview, and Information seems reduntant, since it's the name of the current section anyway)



TODO
-------



+ Update nav on loadProject - OK
+ project menu change at the beginning of the animation - OK
+ image countdown change at the beginning of the animation - OK
+ fade out bar/hide bar when changing project
+ info text also should appear before beginning of animation
+ Text hides behind the menu on small screens
+ image number with high z-index. So it's always visible
+ Set 10px always on the image countdown
+ select image depending on size of device 
+ delete useless children().each
+ resize images 
	try this on osx 
	https://github.com/JamieMason/grunt-imageoptim
	[can do a watch:imageoptim task target to be run on OSX]

+ about page
+ event callback defined in document.ready ?!?
+ Scrollbar arrows not working in most of the projects 
	+ arrows works when over on the container - if mouse cursor was already on it, mouse cursor needs to go out and then enter again
	+ use jQuery trigger to force trigger mouse events

+ set darker background f3f3f4
+ text 14px - 16px line height
+ MORE INFO not working - OK
+ Homepage - OK
+ Update Next Project/Past Project - OK

 

+ Images navigation
	+ Click on image on touch devices - OK
+ About Page - OK
+ Apply style to all projects - OK
+ Put scrollbar in the side - as if it was a normal one - OK
+ Text container starts from the top - OK
+ Put perfect scrollbar visible just if content bigger then container - OK
+ Set font - OK
+ Set intro - OK
+ Style info section - OK
+ Load more info content with jQuery - OK
+ Limit project photos/content so it's not too heavy - OK
+ BG logo is moving with arrows - because of the project content widening the document
	+ put it in a new container that doesn't change width (HARD)



Restyle - Tim 6-2-2014
--------------
1. Just important links in the text - those are underlined
	- press
	- project website
2. Links on nav menu not underlined
3. Font-size: 16 - Line-height: 18
4. Past project/Next project go away when not clickable
5. About comes from the top
6. More info/less info





Style notes
------

+ Try avoid specify event handler in markup (like onclick). Better use jQuery on (see http://stackoverflow.com/questions/12627443/jquery-click-vs-onclick?lq=1)

+ No more id=0, id=1 for images. Id should be univocal




Tech stuff
-------

+ When set project from hash, use same animation used for moving between sections
+ SetProjectFromHash makes load the project html twice
+ With ghostery and adblocks pages with youtube and vimeo are slowed down (a lot)


Navigation 
	+ Blank href on links messes with the hash navigation. Need to put dynamic href with javascript 
Projects
+ Message Box? 
+ Patch of Sky
+ Hacking Households (change name to programming objects)
+ Future Governament Services
+ Stone Pad

+ Images
	+ On desktop cursor becomes an arrow
	+ On touch devices clicking on images will increment the counter
	+ Put the counter below the image instead of Previous/Next links

+ Orgonomy opening 

+ Find the font solution (that I sent to Tim already)

+ Scrolling bar on the right - no 

+ 


Tim questions
--------
+ Links should be different from text. Underline on hover is not enough. Cannot distinguish from other text before hovering around. And impossible to distinguish on touch devices. 

+ Possibility for "more information" link. To put a scroll inside there. So it's possible to put a lot of more stuff. 

+ Do you like the actual "more information" section? 

+ Problem with where to put my name. Idea was that homepage is "about" section. So that my information is there at first.





TODO
============
+ Blank href on links (so that they look touchable) and a link everywhere - OK
+ On touch previous project/next project keeps underline - OK
+ Scroll projects with arrows and touch scroll - OK

+ Responsiveness - OK

	+ Media queries
		+ On bg logo size
	+ One more information top 
	+ Disable horizontal scrolling on "More information"

+ Disable href on disabled links 
+ Distinguish links from not links
	+ links are light blue
	+ underline on hover

+ Home is the the about page (here my name, short bio and contacts)
+ Take away contacts

+ On mobile touched button keeps underlined
+ Allow caching for AJAX on production. Images are heavy.
+ Gif images compression wrong
+ Set color on text highlight
+ Add back link of project when going to more information

+ Credits
			2014 - <a href="http://fabrica.it/">Fabrica</a><br>
			

			Client: Dubai HAHAHA 

			2014 - Project commissioned by BIO50, 

			<a href="http://fabrica.it/">Fabrica</a><br>
			Client: Dubai HAHAHA 

			put team? 
			put photo credits




