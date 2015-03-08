TODO
-------
+ faster image change - OK
+ centralize image for mobile - OK
+ On mobile view text left/right margin same of the menu margins - ok


+ when showing the text, opening the about and then closing it, the scrollbar appear - ok


+ Left align everything (also CV, Twitter, Email) 
+ Add to the bottom

Website design.....Tim Wan
Development........Leonardo Amico 

+ Put link to Tim


+ When refreshing the about page, there's no about anymore - OK

+ Change the title of the "Museum of The Future... " to "Museum of Future..."

+ more fluid effect when scrolling the text on touch devices


+ change color on link:active (light blue) - OK
+ make sure its possible to touch buttons on my phone - OK
+ fix about link behavior - fade out/fade in not really working - OK
+ ver scrolling on project info not working on my phone - OK
	commented overflow-x: hidden; in body - check if still good for other more popular devices (ipad)

+ add images links and links to metatags

+ Update about - OK
	Creative technologist with a focus in digital interactive products, employing software and electronics to prototype and test possible future scenarios of everyday life.

+ project order - pos; programming objects; message box; Museum; Stone Pad - OK
+ more photos for museum of future - of the general exhibition at least - OK
+ chech text for typos - OK
+ add metatags - OK
+ In the about page - Curriculam Vitae • Twitter • Email - OK
+ put higher res image for technology patch of sky - OK
+ check if possible to add more images for museum - OK
+ when going to project info, back arrow not working - when loading new project need to destroy what there was before - OK
+ close link fades out (maybe didn't push from fedora) - OK

+ On about
MSc Electronics Engineer graduate - OK
Creative technologist with a focus in design and prototype of digital interactive products. - OK






+ display: none to info when showing image
+ bugfix: when closing abuout goes to patch of sky


+ Update bg color - OK
+ About in vertical - OK 
+ mobile with menu going up - OK
	+ overflow-y: hidden when launching about
	+ overflow-y: hidden when on image

+ disable pointer on disabled links - on css - OK
	pointer-events: none;
   	cursor: default;

+ hide bg image when crossfading images - OK
+ change media query for images loading - OK
+ image fades out before the next fades in - OK
+ Menu - change more/less fo  Text / Image - OK
+ Can we do a line through it like this — Next Project - OK
+ add favicon - OK
	added from here http://realfavicongenerator.net
+ Also, please use the supplied logotype instead if possible and lock it so it cannot be selected? - OK
+ courier new - font stack - OK

+ Opening, needs a bit more time before the rest comes in. I think the images and the menu should both fade in at the same rate.



+ on my mobile launches in half screen
+ Scrollbar arrows not working in most of the projects 
	+ arrows works when over on the container - if mouse cursor was already on it, mouse cursor needs to go out and then enter again
	+ use jQuery trigger to force trigger mouse events



+ about page - OK
+ select image depending on size of device - OK


+ resize images 
	try this on osx 
	https://github.com/JamieMason/grunt-imageoptim
	[can do a watch:imageoptim task target to be run on OSX]

+ Update nav on loadProject - OK
+ project menu change at the beginning of the animation - OK
+ image countdown change at the beginning of the animation - OK
+ fade out bar/hide bar when changing project - OK
+ info text also should appear before beginning of animation - OK
+ Set 10px always on the image countdown - OK
+ Text hides behind the menu on small screens - OK
	+ check if this solution works - otherwise to reset to 
	comment @media-query in .text-container-wrapper
	uncomment @media-query top: 10% in .text-container

+ set darker background f3f3f4 - OK
+ text 14px - 16px line height - OK




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




