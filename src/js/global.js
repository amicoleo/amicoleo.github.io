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
    if (getLocationHash() == "")
        return currentProjectId;
    if (getLocationHash() != "")
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
                    $("#info-link").html("More&nbsp;information");
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
                   $("#info-link").html("More&nbsp;information");

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
    console.log("Hash change"); 
    if (bNavigation)
        bNavigation = false; 
    else {
        if (getLocationHash() != "")
            setCurrentProjectFromHash(); 
    }
}

function setCurrentProjectFromHash(){
    console.log("set current project from hash"); 
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

    if ($("#info-link").html() == "More&nbsp;information"){
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
                    $("#info-link").html("Less&nbsp;information"); 
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
                    $("#info-link").html("More&nbsp;information"); 
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
                    $("#info-link").html("More&nbsp;information");
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
    console.log("updateProjectNavButtons"); 
    if (currentProjectId == 0)
        disableLink($(".nav-menu > a.back-button-menu")); 
    else {
        enableLink($(".nav-menu > a.back-button-menu")); 
    }

    if (currentProjectId == projects.length -1){
        console.log("disable next project"); 
        disableLink($(".nav-menu > a.next-button-menu")); 
    }else {
        enableLink($(".nav-menu > a.next-button-menu")); 
    }
}

function disableLink(linkDiv){
    if (!linkDiv.hasClass("disabled")){
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


//On touch scroll
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);
 
var scrollingOffsetX = 5; 
var bTouchScrolling = false;
var scrollingStartX;
function handleTouchMove(event) {
    event.preventDefault();
    var touches = event.changedTouches;
    if (!bTouchScrolling){
        bTouchScrolling = true;
        scrollingStartX = touches[0].pageX;
    }
}
 
function handleTouchEnd(event) {
    var touches = event.changedTouches;
    if (bTouchScrolling){
        bTouchScrolling = false;
        if (touches[0].pageX > scrollingStartX + scrollingOffsetX)
            pastProject(); 
        else if (touches[0].pageX < scrollingStartX - scrollingOffsetX)
            nextProject(); 
    }
}

//On arrows
document.addEventListener("keyup", handleKeyUp, false);

function handleKeyUp(event){
    if (event.keyCode == 37)
        pastProject(); 
    else if (event.keyCode == 39)
        nextProject(); 
} 