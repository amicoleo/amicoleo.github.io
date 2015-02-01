/*! perfect-scrollbar - v0.5.8
* http://noraesae.github.com/perfect-scrollbar/
* Copyright (c) 2014 Hyunje Alex Jun; Licensed MIT */
(function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?e(require("jquery")):e(jQuery)})(function(e){"use strict";function t(e){return"string"==typeof e?parseInt(e,10):~~e}var o={wheelSpeed:1,wheelPropagation:!1,swipePropagation:!0,minScrollbarLength:null,maxScrollbarLength:null,useBothWheelAxes:!1,useKeyboard:!0,suppressScrollX:!1,suppressScrollY:!1,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:!1},n=0,r=function(){var e=n++;return function(t){var o=".perfect-scrollbar-"+e;return t===void 0?o:t+o}},l="WebkitAppearance"in document.documentElement.style;e.fn.perfectScrollbar=function(n,i){return this.each(function(){function a(e,o){var n=e+o,r=D-R;j=0>n?0:n>r?r:n;var l=t(j*(Y-D)/(D-R));M.scrollTop(l)}function s(e,o){var n=e+o,r=E-k;W=0>n?0:n>r?r:n;var l=t(W*(C-E)/(E-k));M.scrollLeft(l)}function c(e){return P.minScrollbarLength&&(e=Math.max(e,P.minScrollbarLength)),P.maxScrollbarLength&&(e=Math.min(e,P.maxScrollbarLength)),e}function u(){var e={width:I};e.left=B?M.scrollLeft()+E-C:M.scrollLeft(),N?e.bottom=_-M.scrollTop():e.top=Q+M.scrollTop(),H.css(e);var t={top:M.scrollTop(),height:A};Z?t.right=B?C-M.scrollLeft()-V-J.outerWidth():V-M.scrollLeft():t.left=B?M.scrollLeft()+2*E-C-$-J.outerWidth():$+M.scrollLeft(),G.css(t),U.css({left:W,width:k-z}),J.css({top:j,height:R-et})}function d(){M.removeClass("ps-active-x"),M.removeClass("ps-active-y"),E=P.includePadding?M.innerWidth():M.width(),D=P.includePadding?M.innerHeight():M.height(),C=M.prop("scrollWidth"),Y=M.prop("scrollHeight"),!P.suppressScrollX&&C>E+P.scrollXMarginOffset?(X=!0,I=E-F,k=c(t(I*E/C)),W=t(M.scrollLeft()*(I-k)/(C-E))):(X=!1,k=0,W=0,M.scrollLeft(0)),!P.suppressScrollY&&Y>D+P.scrollYMarginOffset?(O=!0,A=D-tt,R=c(t(A*D/Y)),j=t(M.scrollTop()*(A-R)/(Y-D))):(O=!1,R=0,j=0,M.scrollTop(0)),W>=I-k&&(W=I-k),j>=A-R&&(j=A-R),u(),X&&M.addClass("ps-active-x"),O&&M.addClass("ps-active-y")}function p(){var t,o,n=function(e){s(t,e.pageX-o),d(),e.stopPropagation(),e.preventDefault()},r=function(){H.removeClass("in-scrolling"),e(q).unbind(K("mousemove"),n)};U.bind(K("mousedown"),function(l){o=l.pageX,t=U.position().left,H.addClass("in-scrolling"),e(q).bind(K("mousemove"),n),e(q).one(K("mouseup"),r),l.stopPropagation(),l.preventDefault()}),t=o=null}function f(){var t,o,n=function(e){a(t,e.pageY-o),d(),e.stopPropagation(),e.preventDefault()},r=function(){G.removeClass("in-scrolling"),e(q).unbind(K("mousemove"),n)};J.bind(K("mousedown"),function(l){o=l.pageY,t=J.position().top,G.addClass("in-scrolling"),e(q).bind(K("mousemove"),n),e(q).one(K("mouseup"),r),l.stopPropagation(),l.preventDefault()}),t=o=null}function v(e,t){var o=M.scrollTop();if(0===e){if(!O)return!1;if(0===o&&t>0||o>=Y-D&&0>t)return!P.wheelPropagation}var n=M.scrollLeft();if(0===t){if(!X)return!1;if(0===n&&0>e||n>=C-E&&e>0)return!P.wheelPropagation}return!0}function g(e,t){var o=M.scrollTop(),n=M.scrollLeft(),r=Math.abs(e),l=Math.abs(t);if(l>r){if(0>t&&o===Y-D||t>0&&0===o)return!P.swipePropagation}else if(r>l&&(0>e&&n===C-E||e>0&&0===n))return!P.swipePropagation;return!0}function b(){function e(e){var t=e.originalEvent.deltaX,o=-1*e.originalEvent.deltaY;return(t===void 0||o===void 0)&&(t=-1*e.originalEvent.wheelDeltaX/6,o=e.originalEvent.wheelDeltaY/6),e.originalEvent.deltaMode&&1===e.originalEvent.deltaMode&&(t*=10,o*=10),t!==t&&o!==o&&(t=0,o=e.originalEvent.wheelDelta),[t,o]}function t(t){if(l||!(M.find("select:focus").length>0)){var n=e(t),r=n[0],i=n[1];o=!1,P.useBothWheelAxes?O&&!X?(i?M.scrollTop(M.scrollTop()-i*P.wheelSpeed):M.scrollTop(M.scrollTop()+r*P.wheelSpeed),o=!0):X&&!O&&(r?M.scrollLeft(M.scrollLeft()+r*P.wheelSpeed):M.scrollLeft(M.scrollLeft()-i*P.wheelSpeed),o=!0):(M.scrollTop(M.scrollTop()-i*P.wheelSpeed),M.scrollLeft(M.scrollLeft()+r*P.wheelSpeed)),d(),o=o||v(r,i),o&&(t.stopPropagation(),t.preventDefault())}}var o=!1;window.onwheel!==void 0?M.bind(K("wheel"),t):window.onmousewheel!==void 0&&M.bind(K("mousewheel"),t)}function h(){var t=!1;M.bind(K("mouseenter"),function(){t=!0}),M.bind(K("mouseleave"),function(){t=!1});var o=!1;e(q).bind(K("keydown"),function(n){if((!n.isDefaultPrevented||!n.isDefaultPrevented())&&t){for(var r=document.activeElement?document.activeElement:q.activeElement;r.shadowRoot;)r=r.shadowRoot.activeElement;if(!e(r).is(":input,[contenteditable]")){var l=0,i=0;switch(n.which){case 37:l=-30;break;case 38:i=30;break;case 39:l=30;break;case 40:i=-30;break;case 33:i=90;break;case 32:case 34:i=-90;break;case 35:i=n.ctrlKey?-Y:-D;break;case 36:i=n.ctrlKey?M.scrollTop():D;break;default:return}M.scrollTop(M.scrollTop()-i),M.scrollLeft(M.scrollLeft()+l),o=v(l,i),o&&n.preventDefault()}}})}function w(){function e(e){e.stopPropagation()}J.bind(K("click"),e),G.bind(K("click"),function(e){var o=t(R/2),n=e.pageY-G.offset().top-o,r=D-R,l=n/r;0>l?l=0:l>1&&(l=1),M.scrollTop((Y-D)*l)}),U.bind(K("click"),e),H.bind(K("click"),function(e){var o=t(k/2),n=e.pageX-H.offset().left-o,r=E-k,l=n/r;0>l?l=0:l>1&&(l=1),M.scrollLeft((C-E)*l)})}function m(){function t(){var e=window.getSelection?window.getSelection():document.getSlection?document.getSlection():{rangeCount:0};return 0===e.rangeCount?null:e.getRangeAt(0).commonAncestorContainer}function o(){r||(r=setInterval(function(){return x()?(M.scrollTop(M.scrollTop()+l.top),M.scrollLeft(M.scrollLeft()+l.left),d(),void 0):(clearInterval(r),void 0)},50))}function n(){r&&(clearInterval(r),r=null),H.removeClass("in-scrolling"),G.removeClass("in-scrolling")}var r=null,l={top:0,left:0},i=!1;e(q).bind(K("selectionchange"),function(){e.contains(M[0],t())?i=!0:(i=!1,n())}),e(window).bind(K("mouseup"),function(){i&&(i=!1,n())}),e(window).bind(K("mousemove"),function(e){if(i){var t={x:e.pageX,y:e.pageY},r=M.offset(),a={left:r.left,right:r.left+M.outerWidth(),top:r.top,bottom:r.top+M.outerHeight()};t.x<a.left+3?(l.left=-5,H.addClass("in-scrolling")):t.x>a.right-3?(l.left=5,H.addClass("in-scrolling")):l.left=0,t.y<a.top+3?(l.top=5>a.top+3-t.y?-5:-20,G.addClass("in-scrolling")):t.y>a.bottom-3?(l.top=5>t.y-a.bottom+3?5:20,G.addClass("in-scrolling")):l.top=0,0===l.top&&0===l.left?n():o()}})}function T(t,o){function n(e,t){M.scrollTop(M.scrollTop()-t),M.scrollLeft(M.scrollLeft()-e),d()}function r(){h=!0}function l(){h=!1}function i(e){return e.originalEvent.targetTouches?e.originalEvent.targetTouches[0]:e.originalEvent}function a(e){var t=e.originalEvent;return t.targetTouches&&1===t.targetTouches.length?!0:t.pointerType&&"mouse"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE?!0:!1}function s(e){if(a(e)){w=!0;var t=i(e);p.pageX=t.pageX,p.pageY=t.pageY,f=(new Date).getTime(),null!==b&&clearInterval(b),e.stopPropagation()}}function c(e){if(!h&&w&&a(e)){var t=i(e),o={pageX:t.pageX,pageY:t.pageY},r=o.pageX-p.pageX,l=o.pageY-p.pageY;n(r,l),p=o;var s=(new Date).getTime(),c=s-f;c>0&&(v.x=r/c,v.y=l/c,f=s),g(r,l)&&(e.stopPropagation(),e.preventDefault())}}function u(){!h&&w&&(w=!1,clearInterval(b),b=setInterval(function(){return x()?.01>Math.abs(v.x)&&.01>Math.abs(v.y)?(clearInterval(b),void 0):(n(30*v.x,30*v.y),v.x*=.8,v.y*=.8,void 0):(clearInterval(b),void 0)},10))}var p={},f=0,v={},b=null,h=!1,w=!1;t&&(e(window).bind(K("touchstart"),r),e(window).bind(K("touchend"),l),M.bind(K("touchstart"),s),M.bind(K("touchmove"),c),M.bind(K("touchend"),u)),o&&(window.PointerEvent?(e(window).bind(K("pointerdown"),r),e(window).bind(K("pointerup"),l),M.bind(K("pointerdown"),s),M.bind(K("pointermove"),c),M.bind(K("pointerup"),u)):window.MSPointerEvent&&(e(window).bind(K("MSPointerDown"),r),e(window).bind(K("MSPointerUp"),l),M.bind(K("MSPointerDown"),s),M.bind(K("MSPointerMove"),c),M.bind(K("MSPointerUp"),u)))}function y(){M.bind(K("scroll"),function(){d()})}function L(){M.unbind(K()),e(window).unbind(K()),e(q).unbind(K()),M.data("perfect-scrollbar",null),M.data("perfect-scrollbar-update",null),M.data("perfect-scrollbar-destroy",null),U.remove(),J.remove(),H.remove(),G.remove(),M=H=G=U=J=X=O=E=D=C=Y=k=W=_=N=Q=R=j=V=Z=$=B=K=null}function S(){d(),y(),p(),f(),w(),m(),b(),(ot||nt)&&T(ot,nt),P.useKeyboard&&h(),M.data("perfect-scrollbar",M),M.data("perfect-scrollbar-update",d),M.data("perfect-scrollbar-destroy",L)}var P=e.extend(!0,{},o),M=e(this),x=function(){return!!M};if("object"==typeof n?e.extend(!0,P,n):i=n,"update"===i)return M.data("perfect-scrollbar-update")&&M.data("perfect-scrollbar-update")(),M;if("destroy"===i)return M.data("perfect-scrollbar-destroy")&&M.data("perfect-scrollbar-destroy")(),M;if(M.data("perfect-scrollbar"))return M.data("perfect-scrollbar");M.addClass("ps-container");var E,D,C,Y,X,k,W,I,O,R,j,A,B="rtl"===M.css("direction"),K=r(),q=this.ownerDocument||document,H=e("<div class='ps-scrollbar-x-rail'>").appendTo(M),U=e("<div class='ps-scrollbar-x'>").appendTo(H),_=t(H.css("bottom")),N=_===_,Q=N?null:t(H.css("top")),z=t(H.css("borderLeftWidth"))+t(H.css("borderRightWidth")),F=t(H.css("marginLeft"))+t(H.css("marginRight")),G=e("<div class='ps-scrollbar-y-rail'>").appendTo(M),J=e("<div class='ps-scrollbar-y'>").appendTo(G),V=t(G.css("right")),Z=V===V,$=Z?null:t(G.css("left")),et=t(G.css("borderTopWidth"))+t(G.css("borderBottomWidth")),tt=t(G.css("marginTop"))+t(G.css("marginBottom")),ot="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,nt=null!==window.navigator.msMaxTouchPoints;return S(),M})}});
// Time variable
var slidingTime = 1500; 

//
var homeProjectId = 0; 
var currentProjectImageId = 0; //Sets what image 

//
var bNavigation = false; 
var bAboutSection = false; 
var bContactSection = false; 
var currentProjectId = homeProjectId; //Initialize with no project selected
var projects = [
        {fileName: "../PatchOfSky.html", hash: "PatchOfSky", name: "Patch Of Sky"}, 
        {fileName: "../StonePad.html", hash: "StonePad", name: "Stone Pad"}, //[ProjectHTMLFilename, ProjectHash]
        {fileName: "../MessageBox.html", hash: "MessageBox", name: "Message Box"},
        {fileName: "../HackingHouseholds.html", hash: "HackingHouseholds", name: "Hacking Households"}, 
    ];

var aboutSectionInfo = {fileName: "../about.html", hash: "About", name: "About"}; 
var contactSectionInfo = {fileName: "../contact.html", hash: "Contact", name: "Contact"}; 


$(function() {

    setCurrentProjectFromHash();    
    if (currentProjectId-1 > -1){ //There's some project before
    } else {
    }
    if (currentProjectId + 1 < projects.length){ //There's some project after                         
    } else {
    }
});


function getCurrentProjectIdFromHash(){
    for (var i=0; i < projects.length; i++){
        if (projects[i].hash == getLocationHash()){
            return i; 
        }
    }
    return homeProjectId; //No project associated with this hash
}

function pastProject() {
	if (!bNavigation){
        if (currentProjectId-1 > -1){ //There's some project before
            bNavigation = true; 
            currentProjectId--; 
            
            $("#container").append('<section id="left-section"></section>'); //Add section positioned at the right of viewport
            
           $.ajax({
                url: projects[currentProjectId].fileName,
                cache: false
            })
            .done(function(content) {
                $( "#left-section").html(content);
                setupImages($( "#left-section" ));
            });
            
            $("#left-section").animate({ //Slide in new project section
                    "marginLeft": "0%"
                }, slidingTime, function() {
                    // Animation complete.
                    $(this).removeAttr("id"); //Delete right-section id from div
                    $(this).attr("id", "viewport-section"); //Add viewport-section id to div
                    setLocationHash(projects[currentProjectId].hash); //Change url 
                    $("#project-name").html(projects[currentProjectId].name); 
                    $("#info-link").html("More information");
                    updateProjectNavButtons(); 
            });
            
            $("#viewport-section").animate({
                    "marginLeft": "110%"
                }, slidingTime, function() {
                $(this).remove();  
             });
        }
    }
    
}

function nextProject() {
	if (!bNavigation){
	    if (currentProjectId + 1 < projects.length){
	        bNavigation = true; 
	        currentProjectId++; 
	        
	        $("#container").append('<section id="right-section"></section>'); //Add section positioned at the right of viewport
	        
	        $.ajax({
	            url: projects[currentProjectId].fileName,
	            cache: false
	        })
	        .done(function(content) {
	            $( "#right-section" ).html(content);
                setupImages($( "#right-section" ));
	        });
	        
	        $("#right-section").animate({ //Slide in new project section
	                "marginLeft": "0%"
	            }, slidingTime, function() {
	                // Animation complete.
	               $(this).removeAttr("id"); //Delete right-section id from div
	               $(this).attr("id", "viewport-section"); //Add viewport-section id to div
	               setLocationHash(projects[currentProjectId].hash); //Change url 
	               $("#project-name").html(projects[currentProjectId].name); 
                   $("#info-link").html("More information");

                   updateProjectNavButtons(); 
            });
	        
	        $("#viewport-section").animate({
	                "marginLeft": "-110%"
	            }, slidingTime, function() {
	            $(this).remove();  
	         });
	    }
	}
}


function getLocationHash(){
	return window.location.hash.substring(1);
}

function setLocationHash(str){
	window.location.hash = str;
	currentPageHash = str; 
}

window.onhashchange = function(e) {
    if (bNavigation)
        bNavigation = false; 
    else {
        console.log("Set project from hash"); 
        setCurrentProjectFromHash(); 
    }
}

function setCurrentProjectFromHash(){
    currentProjectId = getCurrentProjectIdFromHash(); 
    updateProjectNavButtons(); 
    if (getLocationHash() == "About"){
        $.ajax({
            url: "./about.html",
            cache: false
        })
        .done(function(content) {
            $( "#viewport-section" ).html(content);
            bAboutSection = true; 
            bContactSection = false; 

            //
            $(".nav-menu.collapsed").css("opacity", "1.0"); 
            $(".nav-menu.collapsed").css("visibility", "visible");
            //Change nav menu - fade out expanded one
            $(".nav-menu.expanded").css("opacity", "0.0"); 
            $(".nav-menu.expanded").css("visibility", "hidden"); 
        });
    }
    else if (getLocationHash() == "Contact"){

        $.ajax({
            url: "./contact.html",
            cache: false
        })
        .done(function(content) {
            $( "#viewport-section" ).html(content);
            bContactSection = true; 
            bAboutSection = false; 

            //
            $(".nav-menu.collapsed").css("opacity", "1.0"); 
            $(".nav-menu.collapsed").css("visibility", "visible");
            //Change nav menu - fade out expanded one
            $(".nav-menu.expanded").css("opacity", "0.0"); 
            $(".nav-menu.expanded").css("visibility", "hidden"); 
        });
    }

    else{ 
        if (currentProjectId < 0 && currentProjectId > projects.length-1){
            currentProjectId = homeProjectId; 
        }

        $.ajax({
            url: projects[currentProjectId].fileName,
            cache: false
        })
        .done(function(content) {
            $( "#viewport-section" ).html(content);
            $("#project-name").html(projects[currentProjectId].name); 
            setupImages($( "#viewport-section" )); 

             //
            $(".nav-menu.collapsed").css("opacity", "0.0"); 
            $(".nav-menu.collapsed").css("visibility", "hidden"); 
            //Change nav menu - fade out expanded one
            $(".nav-menu.expanded").css("opacity", "1.0"); 
            $(".nav-menu.expanded").css("visibility", "visible");

            //

        });
    }
}

//Project functions
function setupImages(parentDiv){
     //Initial setup of images (opacity = 1.0 for initial image)
    currentProjectImageId = 0; 
    parentDiv.find( ".img-container" ).children().each(function(){
        if ($(this).attr("id") == currentProjectImageId){
            $(this).css( "opacity", "1.0" );
        }else{
            $(this).css( "opacity", "0.0" );
        }
    }); 

    updateImgNavButtons(); 
    
}



function moreInformation(){
    $("#background-logo").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images

    if ($("#info-link").html() == "More information"){
        $( ".img-container" ).children().each(function(){
            if ($(this).attr("id") == currentProjectImageId){
                $(this).animate({"opacity": "0.0"}, 1000, function() {});
            }
        });
        
        $(".img-footer").animate({ "opacity": "0.0"}, 1000, function() {}); 

        $(".text-container-wrapper").css("visibility", "visible"); 
        $(".text-container-wrapper").animate({ 
                "opacity": "1.0"
                }, 1000, function() {
                    $("#background-logo").css("opacity", "1.0"); 
                    $("#info-link").html("Less information"); 
                    $(".text-container-wrapper").perfectScrollbar(); 
                }); 
    } else {
        $( ".img-container" ).children().each(function(){
            if ($(this).attr("id") == currentProjectImageId){
                $(this).animate({"opacity": "1.0"}, 1000, function() {});
            }
        });
        
        $(".img-footer").animate({ "opacity": "1.0"}, 1000, function() {}); 
        $(".text-container-wrapper").animate({ 
                "opacity": "0.0"
                }, 1000, function() {
                    $("#background-logo").css("opacity", "1.0"); 
                    $("#info-link").html("More information"); 
                    $(".text-container-wrapper").css("visibility", "hidden"); 

                }); 

    }
}

function pastImage(){

    if (currentProjectImageId > 0){
        $("#background-logo").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images
        $( ".img-container" ).children().each(function(){
            if ($(this).attr("id") == currentProjectImageId){
                $(this).animate({ 
                        "opacity": "0.0"
                        }, 1000, function() {});
            }
            else if ($(this).attr("id") == currentProjectImageId-1){
                $(this).animate({ 
                        "opacity": "1.0"
                        }, 1000, function() {
                            currentProjectImageId--; 
                            updateImgNavButtons(); 

                            $("#background-logo").css("opacity", "1.0"); 
                        });
            }
        }); 
    }
}


function nextImage(){
    console.log("nextImage"); 
    if (currentProjectImageId < $( ".img-container" ).children().length -1){
        $("#background-logo").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images
        $( ".img-container" ).children().each(function(){
            if ($(this).attr("id") == currentProjectImageId){
                $(this).animate({ 
                        "opacity": "0.0"
                        }, 1000, function() {});
            }
            else if ($(this).attr("id") == currentProjectImageId+1){
                $(this).animate({"opacity": "1.0"}, 1000, 
                    function() {
                        currentProjectImageId++; 
                        updateImgNavButtons(); 
                        $("#background-logo").css("opacity", "1.0"); 
                    });
            }
        }); 
    }
   
}


function showAdditionalSection(sectionInfo){
    $("#container").append('<section id="right-section"></section>'); //Add section positioned at the right of viewport
    
    //Show menu, so to allow it to fade in. 
    $(".nav-menu.collapsed").css("visibility", "visible"); 

    $.ajax({
        url: sectionInfo.fileName,
        cache: false
    })
    .done(function(content) {
        $( "#right-section" ).html(content);
    });
    
    $("#right-section").animate({ //Slide in new project section
            "marginLeft": "0%"
        }, slidingTime, function() {
            // Animation complete.
           $(this).removeAttr("id"); //Delete right-section id from div
           $(this).attr("id", "viewport-section"); //Add viewport-section id to div
           setLocationHash(sectionInfo.hash); //Change url 
           //Modify projects nav menu
    });

    //Change nav menu - fade in collapsed one
    $(".nav-menu.collapsed").animate({ //Slide in new project section
            "opacity": "1.0"
        }, slidingTime, function() {});
    //Change nav menu - fade out expanded one
    $(".nav-menu.expanded").animate({ //Slide in new project section
            "opacity": "0.0"
        }, slidingTime, function() {
            $(this).css("visibility", "hidden"); 
        });

    //Slide out current section
    $("#viewport-section").animate({
        "marginLeft": "-110%"
    }, slidingTime, function() {
            $(this).remove();  
    });
}


function showAboutSection(){
    if (!bNavigation){
        if (!bAboutSection){
            bNavigation = true; 
            bContactSection = false; 
            bAboutSection = true; 
            showAdditionalSection(aboutSectionInfo); 
        }
    }
}



function showContactSection(){
    if (!bNavigation){
        if (!bContactSection){
            bNavigation = true; 
            bAboutSection = false; 
            bContactSection = true; 
            showAdditionalSection(contactSectionInfo); 
        }
    }
}

function showProjectsSection(){
    if (!bNavigation){
        bNavigation = true; 
        if (bAboutSection || bContactSection){
            bAboutSection = false; 
            bContactSection = false; 

            $("#container").append('<section id="left-section"></section>'); //Add section positioned at the right of viewport

            //Show menu, so to allow it to fade in. 
            $(".nav-menu.expanded").css("visibility", "visible"); 
            
            $.ajax({
                url: projects[currentProjectId].fileName,
                cache: false
            })
            .done(function(content) {
                $( "#left-section" ).html(content);
                setupImages($( "#left-section" ));
            });
            
            $("#left-section").animate({ //Slide in new project section
                    "marginLeft": "0%"
                }, slidingTime, function() {
                    // Animation complete.
                    $(this).removeAttr("id"); //Delete right-section id from div
                    $(this).attr("id", "viewport-section"); //Add viewport-section id to div
                    setLocationHash(projects[currentProjectId].hash); //Change url 
                    $("#project-name").html(projects[currentProjectId].name); 
                    $("#info-link").html("More information");
            });
            
            $("#viewport-section").animate({
                    "marginLeft": "110%"
                }, slidingTime, function() {
                $(this).remove();  
             });

             //Change nav menu - fade in collapsed one
            $(".nav-menu.expanded").animate({ //Slide in new project section
                    "opacity": "1.0"
                }, slidingTime, function() {});
            //Change nav menu - fade out expanded one
            $(".nav-menu.collapsed").animate({ //Slide in new project section
                    "opacity": "0.0"
                }, slidingTime, function() {
                    $(this).css("visibility", "hidden"); 
                });
        }
    }
}


function updateImgNavButtons(){

    if (currentProjectImageId == 0){
        disableLink($(".project-container > .img-footer > #left")); 
    }else{
        enableLink($(".project-container > .img-footer > #left")); 
    }
    if (currentProjectImageId == $( ".img-container" ).children().length -1){
        disableLink($(".project-container > .img-footer > #right")); 
    }else{
        enableLink($(".project-container > .img-footer > #right")); 
    }
}

function updateProjectNavButtons(){
    if (currentProjectId == 0)
        disableLink($(".nav-menu > #back-button-menu")); 
    else {
        enableLink($(".nav-menu > #back-button-menu")); 
    }

    if (currentProjectId == projects.length -1){
        disableLink($(".nav-menu > #next-button-menu")); 
    }else {
        enableLink($(".nav-menu > #next-button-menu")); 
    }
}

function disableLink(linkDiv){
    if (!linkDiv.hasClass("disabled")){
        console.log("currentProjectImageId:" +currentProjectImageId); 
        linkDiv.addClass("disabled"); 
    }
}
function enableLink(linkDiv){
    if (linkDiv.hasClass("disabled"))
        linkDiv.removeClass("disabled"); 
}

//
window.onresize = function(){
  $(".text-container-wrapper").perfectScrollbar("update");
}

