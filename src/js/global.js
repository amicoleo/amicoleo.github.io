var currentProjectId = 0; //Initialize with no project selected
var currentProjectImageId = 0; 


var contentTransitionTime = 1500;
var contentHomePageAppearTime = 1500; 
var navHomePageAppearTime = 1000; 

var bContentTransition = false; 

var projects = [
        {fileName: "../PatchOfSky.html", hash: "PatchOfSky", name: "PATCH OF SKY"},
        {fileName: "../ProgrammingObjects.html", hash: "ProgrammingObjects", name: "PROGRAMMING OBJECTS"}, 
        {fileName: "../MessageBox.html", hash: "MessageBox", name: "MESSAGE BOX"},
        {fileName: "../StonePad.html", hash: "StonePad", name: "STONE PAD"}, //[ProjectHTMLFilename, ProjectHash]
    ];
var aboutSection = {
    fileName: "../About.html", 
    hash: "About",
}; 

$(function() {
    setContentFromHash();    
    setupLinks();   
});


function setContentFromHash(){
    var currentHash = getLocationHash(); 

    console.log("currentHash: "+currentHash); 
    if (currentHash === "About"){
        showAboutSection(); 
        return; 
        
    }
    else{
        for (var id in projects){
            if (projects[id].hash.toUpperCase() === currentHash.toUpperCase()){
                loadProject(id, false); 
                currentProjectId = parseInt(id); 
                return; 
            }
        }
    }

    $("#viewport-section").css("visibility", "hidden"); 
    $(".nav-menu").css("visibility", "hidden"); 
    loadProject(0, true); //Load first project - which is home 
}

var bHashSetFromDOM = false; 
function setLocationHash(str){
    window.location.hash = str;
}

function getLocationHash(){
    return window.location.hash.substring(1); 
}

window.onhashchange = function() {
     if (!bHashSetFromDOM){
        setContentFromHash(); 
    }else{
        bHashSetFromDOM = false; 
    }
    
}; 




var bProjectInfo = false; 
function setupLinks(){
    $("#info-link").click(
        function(e){
            e.preventDefault();
            showProjectInfo(); 
    }); 

    $(".button-menu.next-button-menu").click(
        function(e){
            e.preventDefault();
            loadNextProject(); 
    }); 

    $(".button-menu.back-button-menu").click(
        function(e){
            e.preventDefault(); //Prevents link from setting the hash 
            loadPastProject(); 
    }); 
    $("#about-link-open").click(
        function(e){
            e.preventDefault();
            showAboutSection(); 
    }); 
    $("#about-link-close").click(
        function(e){
            e.preventDefault();
            showAboutSection(); 
    }); 
}

var bAboutSection = false; 
var lastLocationHash = ""; 
function showAboutSection(){
    if (!bContentTransition){
        bContentTransition = true;
        if (!bAboutSection){

            $("#about-container").animate(
                {"top": "0"}, 
                contentTransitionTime, 
                function() {
                    // Animation complete.
                    bAboutSection = true; 
                    bHashSetFromDOM = true; 
                    bContentTransition = false; 
                    lastLocationHash = getLocationHash(); 
                    console.log("lastLocationHash: "+lastLocationHash); 
                    setLocationHash(aboutSection.hash); 
            });     

            // $("#about-section" ).load(aboutSection.fileName, 
            //     function() {
                         
            // }); 
        }else{
            $("#about-container").animate(
                {"top": "-100%"}, 
                contentTransitionTime, 
                function() {
                    // Animation complete.
                    bAboutSection = false; 
                    bHashSetFromDOM = true; 
                    bContentTransition = false; 

                    setLocationHash(lastLocationHash); 
            });     
            
        }
        
         

        

    }

}

function updateProjectNavButtons(){
    bProjectInfo = false; 
    $("#project-name").html(projects[currentProjectId].name); 
    $("#info-link").html("MORE&nbsp;INFO");

    if (currentProjectId+1 === projects.length){
        $(".button-menu.next-button-menu").addClass("disabled"); 
    }else{
        $(".button-menu.next-button-menu").removeClass("disabled"); 
    }

    if (currentProjectId-1 === -1){
        $(".button-menu.back-button-menu").addClass("disabled"); 
    }else{
        $(".button-menu.back-button-menu").removeClass("disabled");
   }

   if (currentProjectId+1 === projects.length || currentProjectId-1 === -1){
        $(".extra-button-menu").addClass("disabled");  
   }else{
        $(".extra-button-menu").removeClass("disabled"); 
   }
}

function loadProject(projectId, bHomePage){
    currentProjectId = projectId; 
    updateProjectNavButtons(); 
    $("#viewport-section" ).load(projects[projectId].fileName, function() {
        setupImages($("#viewport-section"));
        if (bHomePage){
            homepageFadeIn(); 
        }
    }); 
}

function homepageFadeIn(){
    bContentTransition = true; 
    $("#viewport-section").css("opacity", "0.0"); 
    $("#viewport-section").css("visibility", "visible"); 
    $("#viewport-section").animate(
        {"opacity": "1.0"}, 
        contentHomePageAppearTime, 
        function() {
            bContentTransition = false; 
            $(".nav-menu").css("opacity","0.0");    
            $(".nav-menu").css("visibility","visible"); 
            $(".nav-menu").animate(
                {"opacity": "1.0"}, 
                navHomePageAppearTime
                ); 
    });

}

function loadNextProject(){
    if (!bContentTransition && currentProjectId !== projects.length-1){
        currentProjectId++; 
        bContentTransition = true; 
        console.log("currentProjectId: "+currentProjectId); 
        $("#container").append('<section id="right-section"></section>'); //Add section positioned at the right of viewport
        $("#right-section" ).load(projects[currentProjectId].fileName, function() {
        // Finished loading
            setupImages($("#right-section")); 
            $("#right-section").animate(
                {"marginLeft": "0%"}, 
                contentTransitionTime, 
                function() {
                    // Animation complete.
                   $(this).removeAttr("id"); //Delete right-section id from div
                   $(this).attr("id", "viewport-section"); //Add viewport-section id to div
                   
                   updateProjectNavButtons(); 
                   $("#project-name").html(projects[currentProjectId].name); 
                   $("#info-link").html("MORE&nbsp;INFO");

                   bHashSetFromDOM = true; 
                   bContentTransition = false; 
                   setLocationHash(projects[currentProjectId].hash); 
                   
                });

            $("#viewport-section").animate(
                {"marginLeft": "-110%"}, 
                contentTransitionTime, 
                function() {
                    $(this).remove();  
            });
        });             
    }

}

function loadPastProject(){
    if (!bContentTransition && currentProjectId!==0){
        bContentTransition = true; 
        currentProjectId--; 
        $("#container").append('<section id="left-section"></section>'); //Add section positioned at the right of viewport
        $("#left-section" ).load(projects[currentProjectId].fileName, function() {
        // Finished loading
            setupImages($("#left-section")); 
            $("#left-section").animate(
                {"marginLeft": "0%"}, 
                contentTransitionTime, 
                function() {
                    // Animation complete.
                   $(this).removeAttr("id"); //Delete right-section id from div
                   $(this).attr("id", "viewport-section"); //Add viewport-section id to div
                   
                   updateProjectNavButtons(); 
                   $("#project-name").html(projects[currentProjectId].name); 
                   $("#info-link").html("MORE&nbsp;INFO");

                   bHashSetFromDOM = true; 
                   bContentTransition = false; 
                   setLocationHash(projects[currentProjectId].hash); 
                });

            $("#viewport-section").animate(
                {"marginLeft": "110%"}, 
                contentTransitionTime, 
                function() {
                    $(this).remove();  
            });
        }); 
    }
}

function setupImages(parentDiv){
     //Initial setup of images (opacity = 1.0 for initial image)
    currentProjectImageId = 0; 
    parentDiv.find( ".img-container > a" ).children().each(function(){
        if (parseInt($(this).attr("id")) === currentProjectImageId){
            $(this).css( "opacity", "1.0" );

        }else{
            $(this).css( "opacity", "0.0" );
        }
    }); 
    

    $(".img-container > a").click(
    function(e){
        e.preventDefault(); //Prevents link from setting the hash 
        loadNextImage(); 
    });  

    updateImgNavButtons(parentDiv); 
}

function updateImgNavButtons(parentDiv){
    var totProjectImageNum = parentDiv.find( ".img-container > a" ).children().length; 
    parentDiv.find(".currentImgNum").html(currentProjectImageId+1); 
    parentDiv.find(".totImgNum").html(totProjectImageNum); 

}

var bImageTransition = false; 

function loadNextImage(){
    console.log("bImageTransition: "+bImageTransition); 
    if (!bImageTransition){
        bImageTransition = true; 
        var totProjectImageNum = $( ".img-container > a" ).children().length; 
        var nextProjectImageId = currentProjectImageId+1; 
        if (nextProjectImageId === totProjectImageNum){
            nextProjectImageId = 0; 
        }

        $("#background-logo").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images
        $( ".img-container > a" ).children().each(function(){
            if (parseInt($(this).attr("id")) === currentProjectImageId){
                $(this).animate({ 
                        "opacity": "0.0"
                        }, 1000, function() {});
            }
            else if (parseInt($(this).attr("id")) === nextProjectImageId){
                $(this).animate({"opacity": "1.0"}, 1000, 
                    function() {
                        $("#background-logo").css("opacity", "1.0"); 
                        bImageTransition = false; 
                        currentProjectImageId = nextProjectImageId; 
                        updateImgNavButtons($("#viewport-section")); 
                    });
            }
        });   
    }
}


function showProjectInfo(){
    if (!bContentTransition){
        bProjectInfo = !bProjectInfo; 
        $("#background-logo").css("opacity", "0.0"); 
        if (bProjectInfo){
            $( ".img-container > a" ).children().each(function(){
                if (parseInt($(this).attr("id")) === currentProjectImageId){
                    $(this).animate({"opacity": "0.0"}, 1000, function() {});
                }
            });
            
            $(".img-footer").animate({ "opacity": "0.0"}, 1000, function() {}); 

            $(".text-container-wrapper").css("visibility", "visible"); 
            $(".text-container-wrapper").animate({ 
                "opacity": "1.0"
                }, 1000, function() {
                    $("#background-logo").css("opacity", "1.0"); 
                    $("#info-link").html("LESS&nbsp;INFO"); 
                    if ($(".text-container").height() +  $(".text-container").offset().top > $(window).height()){
                        if (!$(".ps-scrollbar-y-rail").length){//If do not exist
                            $(".text-container-wrapper").perfectScrollbar(); //create
                        }
                        else{
                            $(".text-container-wrapper").perfectScrollbar("update"); //otherwise update
                        }
                    }
                }); 
        }else{
            $( ".img-container > a" ).children().each(function(){
                if (parseInt($(this).attr("id")) === currentProjectImageId){
                    $(this).animate({"opacity": "1.0"}, 1000, function() {});
                }
            });
            
            $(".img-footer").animate({ "opacity": "1.0"}, 1000, function() {}); 
            $(".text-container-wrapper").animate({ 
                "opacity": "0.0"
                }, 1000, function() {
                    $("#background-logo").css("opacity", "1.0"); 
                    $("#info-link").html("MORE&nbsp;INFO"); 
                    $(".text-container-wrapper").css("visibility", "hidden"); 

            }); 
        }
    }

}


// function updateImgNavButtons(){

//     if (currentProjectImageId == 0){
//         disableLink($(".project-container > .img-footer > #left")); 
//     }else{
//         enableLink($(".project-container > .img-footer > #left")); 
//     }
//     if (currentProjectImageId == $( ".img-container" ).children().length -1){
//         disableLink($(".project-container > .img-footer > #right")); 
//     }else{
//         enableLink($(".project-container > .img-footer > #right")); 
//     }
// }



//On arrows
document.addEventListener("keyup", handleKeyUp, false);
// document.addEventListener("keydown", handleKeyUp, false);
// function handleKeyDown(event){
//     event.preventDefault(); 
// }

function handleKeyUp(event){
    // event.preventDefault();   
    if (event.keyCode === 37){
        loadPastProject(); 
    }
    else if (event.keyCode === 39){
        loadNextProject(); 
    }
} 

//On touch scroll
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);
 
var scrollingOffsetX = 15; 
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
        if (touches[0].pageX > scrollingStartX + scrollingOffsetX){
            loadPastProject(); 
        }
        else if (touches[0].pageX < scrollingStartX - scrollingOffsetX){
            loadNextProject(); 
        }
    }
}

window.onresize = function(){
    $(".text-container-wrapper").scrollTop(0); 
    $(".text-container-wrapper").perfectScrollbar("update");
}; 