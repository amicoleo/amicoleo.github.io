How to use
========

Initial requirements
-----------

It requires *NodeJS*, *Grunt* and *Grunt-CLI*. 

After cloning the repo run 
	
	npm install 

for installing the grunt packages. 

Developement
-------

Run 
	
	grunt watch 

For building scss and minify javascript all the time they change. In another terminal window use 

	python -m SimpleHTTPServer 

For launching a localserver for testing


Release
-----------

Run 

	grunt

For building scss, minify javascript, squash images sizes and clean temporary directories. 