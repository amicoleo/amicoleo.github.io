var homeProjectId = 0; 


var bNavigation = false; 
var currentProjectId = homeProjectId; //Initialize with no project selected
var projects = [
        {fileName: "./StonePad.html", hash: "StonePad"}, //[ProjectHTMLFilename, ProjectHash]
        {fileName: "./MessageBox.html", hash: "MessageBox"},
        {fileName: "./HackingHouseholds.html", hash: "HackingHouseholds"}
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
            });
            
            $("#left-section").animate({ //Slide in new project section
                    "marginLeft": "0%"
                }, 2000, function() {
                    // Animation complete.
                    $(this).removeAttr("id"); //Delete right-section id from div
                    $(this).attr("id", "viewport-section"); //Add viewport-section id to div
                    setLocationHash(projects[currentProjectId].hash); //Change url 
                    bNavigation = false; 
            });
            
            $("#viewport-section").animate({
                    "marginLeft": "110%"
                }, 2000, function() {
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
	        });
	        
	        $("#right-section").animate({ //Slide in new project section
	                "marginLeft": "0%"
	            }, 2000, function() {
	                // Animation complete.
	                $(this).removeAttr("id"); //Delete right-section id from div
	                $(this).attr("id", "viewport-section"); //Add viewport-section id to div
	                setLocationHash(projects[currentProjectId].hash); //Change url 
	               bNavigation = false; 
            });
	        
	        $("#viewport-section").animate({
	                "marginLeft": "-110%"
	            }, 2000, function() {
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
    if (!bNavigation){
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
        });
    }else{
        $.ajax({
            url: projects[homeProjectId].fileName,
            cache: false
        })
        .done(function(content) {
            $( "#viewport-section" ).html(content);
        });        
        setLocationHash(""); 
    }
}

