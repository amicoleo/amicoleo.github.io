// Time variable
var slidingTime = 1500; 

//
var homeProjectId = 0; 
var currentProjectImageId = 0; //Sets what image 

//
var bNavigation = false; 
var currentProjectId = homeProjectId; //Initialize with no project selected
var projects = [
        {fileName: "./StonePad.html", hash: "StonePad", name: "Stone Pad"}, //[ProjectHTMLFilename, ProjectHash]
        {fileName: "./MessageBox.html", hash: "MessageBox", name: "Message Box"},
        {fileName: "./HackingHouseholds.html", hash: "HackingHouseholds", name: "Hacking Households"}
    ]; 

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
                    $("#project-name").html(projects[currentProjectId].name)
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
	               $("#project-name").html(projects[currentProjectId].name)
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

    if (currentProjectId > -1 && currentProjectId < projects.length){
        $.ajax({
            url: projects[currentProjectId].fileName,
            cache: false
        })
        .done(function(content) {
            $( "#viewport-section" ).html(content);
            $("#project-name").html(projects[currentProjectId].name)
            setupImages($( "#viewport-section" )); 
        });
    }else{
        $.ajax({
            url: projects[homeProjectId].fileName,
            cache: false
        })
        .done(function(content) {
            $( "#viewport-section" ).html(content);
            setupImages($( "#viewport-section" )); 
        });        
        setLocationHash(""); 
    }
}

//Project functions
function setupImages(parentDiv){
     //Initial setup of images (opacity = 1.0 for initial image)
    currentProjectImageId = 0; 
    console.log("Images to setup: "+parentDiv.find( ".img-container" ).children().length); 
    parentDiv.find( ".img-container" ).children().each(function(){
        if ($(this).attr("id") == currentProjectImageId){
            $(this).css( "opacity", "1.0" );
        }else{
            $(this).css( "opacity", "0.0" );
        }
    }); 
}

function moreInformation(){
    
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
                            $("#background-logo").css("opacity", "1.0"); 
                        });
            }
        }); 
    }
}

function nextImage(){
    if (currentProjectImageId < $( ".img-container" ).children().length -1){
        $("#background-logo").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images
        $( ".img-container" ).children().each(function(){
            if ($(this).attr("id") == currentProjectImageId){
                $(this).animate({ 
                        "opacity": "0.0"
                        }, 1000, function() {});
            }
            else if ($(this).attr("id") == currentProjectImageId+1){
                $(this).animate({ 
                        "opacity": "1.0"
                        }, 1000, function() {
                            currentProjectImageId++; 
                            $("#background-logo").css("opacity", "1.0"); 
                        });
            }
        }); 
    }
}