var currentProjectId = 0; //Initialize with no project selected
var currentProjectImageId = 0; 


var contentTransitionTime = 1500;
var imageTransitionTime = 1000;
var contentHomePageAppearTime = 2000; 
var contentHomePageWaitTime = 500; 
var aboutLinkTransitionTime = 500; 

var bContentTransition = false; 

var breakS = 480;
var breakM = 1024; 
var breakL = 1824; 



var projects = [
        {fileName: "../PatchOfSky.html", hash: "PatchOfSky", name: "PATCH OF SKY"},
        {fileName: "../ProgrammingObjects.html", hash: "ProgrammingObjects", name: "PROGRAMMING OBJECTS"}, 
        {fileName: "../MessageBox.html", hash: "MessageBox", name: "MESSAGE BOX"},
        {fileName: "../MFGS.html", hash: "MuseumFutureGovernmentServices", name: "Museum of Future Government Services"},
        {fileName: "../StonePad.html", hash: "StonePad", name: "STONE PAD"}, //[ProjectHTMLFilename, ProjectHash]

    ];
var aboutSection = {
    fileName: "../About.html", 
    hash: "About",
}; 



$(function() {
    updateImgSrc(); 
    setContentFromHash();    
    setupLinks();   
    jQuery.easing.def = "easeInOutExpo";

});


function setContentFromHash(){
    var currentHash = getLocationHash(); 
    if (currentHash === "About"){
        $(".nav-menu").css("opacity", "1.0"); 
        showAboutSection(false); 
        return; 
        
    }
    else{
        if (bAboutSection){
            $(".viewport-section#project-images").css("visibility", "visible"); 
            showAboutSection(false); //for closing about section
        }
        for (var id in projects){
            if (projects[id].hash.toUpperCase() === currentHash.toUpperCase()){
                currentProjectId = parseInt(id); 
                $(".nav-menu").css("opacity", "1.0"); 
                $(".viewport-section#project-images").css("visibility", "visible"); 
                loadProject(currentProjectId, false); 
                return; 
            }
        }
    }

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
            showAboutSection(true); 
    }); 
    $("#about-link-close").click(
        function(e){
            e.preventDefault();
            showAboutSection(true); 
    }); 
}

var bAboutSection = false; 
var lastLocationHash = ""; 
function showAboutSection(bSetFromDOM){
    if (!bContentTransition){
        bContentTransition = true;
        if (!bAboutSection){
            // 
            $("#about-link-open > div").animate(
                {"opacity": "0.0"}, 
                aboutLinkTransitionTime, function(){
                    $("#about-container").animate(
                        {"top": "0"}, 
                        contentTransitionTime, 
                        function() {
                            // Animation complete.
                            bAboutSection = true; 
                            bContentTransition = false; 
                            lastLocationHash = getLocationHash();
                            if ($(window).width() < breakM){
                                $("body").css("overflow", "hidden"); 
                            }
                            if (bSetFromDOM){
                                bHashSetFromDOM = true; 
                                setLocationHash(aboutSection.hash); 
                            }   

                            //This is for having a project behing the about section, when reached the page from a link
                            if (lastLocationHash === aboutSection.hash){
                                lastLocationHash = projects[0].hash; 
                                loadProject(0); 
                            }
                            $("#about-link-close > div").animate(
                                {"opacity": "1.0"}, 
                                aboutLinkTransitionTime
                                ); 
                    });  
            }); 
   

        }else{
            // $(".text-container-wrapper").css("overflow", "visible"); 
            $("#about-link-close > div").animate(
                {"opacity": "0.0"}, 
                aboutLinkTransitionTime, 
                function(){
                    $("#about-container").animate(
                        {"top": "-100%"}, 
                        contentTransitionTime, 
                        function() {
                            // Animation complete.
                            bAboutSection = false; 
                            bContentTransition = false; 
                            if ($(window).width() < breakM){
                                $("body").css("overflow", "visible"); 
                            }
                            if (bSetFromDOM){
                                setLocationHash(lastLocationHash); 
                                bHashSetFromDOM = true; 
                            }

                            $("#about-link-open > div").animate(
                                {"opacity": "1.0"}, 
                                aboutLinkTransitionTime
                                ); 
                    });     

                });    
        }
    }

}

function updateProjectNavButtons(){
    bProjectInfo = false; 
    $("#project-name").html(projects[currentProjectId].name); 
    $("#info-link").html("TEXT");

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
}

function loadProject(projectId, bHomePage){
    currentProjectId = projectId; 
    updateProjectNavButtons(); 

    if (bHomePage){
        $(".viewport-section#project-images").css("opacity", "0.0"); 
        $(".nav-menu").css("opacity","0.0"); 
    }else{
        $(".viewport-section#project-images").css("opacity", "1.0");
    }
    $(".viewport-section#project-images" ).load(projects[projectId].fileName+" .img-project-container", function() {
        $(".viewport-section#project-info").remove(); 
        $(".viewport-section#project-images").css("visibility", "visible"); 
        setupImages($(".viewport-section#project-images"), function(){
            if (bHomePage){
                homepageFadeIn(); 
            }
        });
        
    }); 
}

function homepageFadeIn(){
    bContentTransition = true; 
    $(".viewport-section#project-images").css("opacity", "0.0"); 
    $(".viewport-section#project-images").css("visibility", "visible"); 
    $(".viewport-section#project-images").delay(contentHomePageWaitTime).animate(
        {"opacity": "1.0"}, 
        contentHomePageAppearTime, 
        function() {
            bContentTransition = false; 
    });

    $(".nav-menu").css("opacity","0.0");    
    $(".nav-menu").delay(contentHomePageWaitTime).animate(
        {"opacity": "1.0"}, 
        contentHomePageAppearTime
        ); 

}

function loadNextProject(){
    if (!bContentTransition && currentProjectId !== projects.length-1){
        currentProjectId++; 
        bContentTransition = true; 
        
        $("#container").append('<section class="right-section"></section>'); //Add section positioned at the right of viewport
        $(".right-section").css("margin-left", "110%"); 
        $(".right-section" ).load(projects[currentProjectId].fileName+" .img-project-container", function() {
            // Finished loading
            updateProjectNavButtons(); 
            setupImages($(".right-section"), function(){
                //

                $(".ps-scrollbar-y-rail").css("visibility", "hidden"); 
                $("html, body").scrollTop(0); 
                
                if (bProjectInfo){
                    $(".ps-scrollbar-y-rail").css("visibility", "hidden"); 
                    $(window).scrollTop(0); 
                }

                $(".right-section").animate(
                    {"marginLeft": "0%"}, 
                    contentTransitionTime, 
                    function() {
                        // Animation complete.
                        $("viewport-section").remove();
                        $(this).addClass("viewport-section"); //Delete right-section id from div
                        $(this).removeClass("right-section"); //Delete right-section id from div
                        $(this).attr("id", "project-images"); //Add viewport-section id to div
                       
                       $("#project-name").html(projects[currentProjectId].name); 
                       $("#info-link").html("TEXT");

                       bHashSetFromDOM = true; 
                       bContentTransition = false; 
                       setLocationHash(projects[currentProjectId].hash); 
                       
                    });

                $(".viewport-section").animate(
                    {"marginLeft": "-110%"}, 
                    contentTransitionTime, 
                    function() {
                        $(this).remove();  
                });
            }); 

        });             
    }

}

function loadPastProject(){
    if (!bContentTransition && currentProjectId!==0){
        bContentTransition = true; 
        currentProjectId--; 
        $("#container").append('<section class="left-section"></section>'); //Add section positioned at the right of viewport
        $(".left-section").css("margin-left", "-110%"); 
        $(".left-section" ).load(projects[currentProjectId].fileName+" .img-project-container", function() {
        // Finished loading
            updateProjectNavButtons(); 
            setupImages($(".left-section"), function(){
                //
                // if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {          
                //             window.scrollTo(0,0); // first value for left offset, second value for top offset
                // }else{ 
                //     $(".ps-scrollbar-y-rail").css("visibility", "hidden"); 
                //     $("html, body").scrollTop(0); 
                // }

                $(".ps-scrollbar-y-rail").css("visibility", "hidden"); 
                $("html, body").scrollTop(0); 

                $(".left-section").animate(
                    {"marginLeft": "0%"}, 
                    contentTransitionTime, 
                    function() {
                        // Animation complete.
                        $(this).addClass("viewport-section"); //Delete right-section id from div
                        $(this).removeClass("left-section"); //Delete right-section id from div
                        $(this).attr("id", "project-images"); //Add viewport-section id to div
                       
                       $("#project-name").html(projects[currentProjectId].name); 
                       $("#info-link").html("TEXT");

                       bHashSetFromDOM = true; 
                       bContentTransition = false; 
                       setLocationHash(projects[currentProjectId].hash); 
                });

                $(".viewport-section").animate(
                    {"marginLeft": "110%"}, 
                    contentTransitionTime, 
                    function() {
                        $(this).remove();  
                });
            }); 

        }); 
    }
}

var imgSrc;
function updateImgSrc(){
    if ($(window).width() < breakS){
        imgSrc = "data-original-s"; 
    }else if ($(window).width() < breakL){
        imgSrc = "data-original-m"; 
    }else{
        imgSrc = "data-original"; 
    }
}

function setupImages(parentDiv, finishedLoadingCallback){
     //Initial setup of images (opacity = 1.0 for initial image)
    currentProjectImageId = 0; 
    var imgDiv = parentDiv.find(" .img-container > a > #0"); 

    imgDiv.css("visibility", "visible"); 
    imgDiv.css( "opacity", "1.0" );

    imgDiv.attr("src", $(imgDiv).attr(imgSrc)).imagesLoaded( function() {
        finishedLoadingCallback(); 
    });  

    $(".img-container > a").click(
    function(e){
        e.preventDefault(); //Prevents link from setting the hash 
        loadNextImage(); 
    });  

    updateImgNavButtons(parentDiv, currentProjectImageId); 
}

function updateImgNavButtons(parentDiv, currentProjectImageId){
    var totProjectImageNum = parentDiv.find( ".img-container > a" ).children().length; 
    parentDiv.find(".currentImgNum").html(currentProjectImageId+1); 
    parentDiv.find(".totImgNum").html(totProjectImageNum); 

}

var bImageTransition = false; 

function loadNextImage(){
    if (!bImageTransition){
        bImageTransition = true; 
        var totProjectImageNum = $( ".img-container > a" ).children().length; 
        var nextProjectImageId = currentProjectImageId+1; 
        if (nextProjectImageId === totProjectImageNum){
            nextProjectImageId = 0; 
        }
        $("#background-logo-img").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images
        updateImgNavButtons($(".viewport-section#project-images"), nextProjectImageId); 
        $( ".img-container > a > #"+currentProjectImageId ).animate({ 
            "opacity": "0.0"
            }, imageTransitionTime, "jswing");
        var imgDiv =  $( ".img-container  a > #"+nextProjectImageId); 
        $( imgDiv ).attr("src", imgDiv.attr(imgSrc)).imagesLoaded(
            function(){
                imgDiv.css("visibility", "visible"); 
                $(imgDiv).animate({ 
                    "opacity": "1.0"
                    }, imageTransitionTime, "jswing", function(){
                        $("#background-logo-img").css("opacity", "1.0"); 
                        bImageTransition = false; 
                        currentProjectImageId = nextProjectImageId; 
            });
        });
    }
}

function setupProjectInfo(){
    $(".viewport-section#project-info").css("visibility", "visible"); 
    $("#info-link").html("IMAGE"); 
    if ($(".text-container").height() +  $(".text-container").offset().top > $(window).height()){
        if ($(window).width() > breakM){
            if (!$(".ps-scrollbar-y-rail").length){//If do not exist
                $(".text-container-wrapper").perfectScrollbar(); //create
                $(".ps-scrollbar-y-rail").css("visibility", "visible"); 
            }
            else{
                $(".text-container-wrapper").perfectScrollbar("update"); //otherwise update
                $(".ps-scrollbar-y-rail").css("visibility", "visible"); 
            }
        }
    }
    $(".viewport-section#project-info").css("display", "inline"); 
    $(".viewport-section#project-info").animate({ 
    "opacity": "1.0"
    }, 1000, function() {
        $("#background-logo-img").css("opacity", "1.0"); 
    }); 
}

function showProjectInfo(){
    if (!bContentTransition){
        bProjectInfo = !bProjectInfo; 
        $("#background-logo-img").css("opacity", "0.0"); 
        if (bProjectInfo){
            $(".viewport-section#project-images").animate({"opacity": "0.0"}, 1000, function()
                {
                    $(".viewport-section#project-images").css("visibility", "hidden"); 
                });
            

            if (!$(".viewport-section#project-info").length){//If do not exist
                $("#container").append('<section class="viewport-section" id="project-info"></section>');
                $(".viewport-section#project-info" ).load(projects[currentProjectId].fileName+" .text-container-wrapper", function() {
                    setupProjectInfo(); 
                }); 
            } else {
                setupProjectInfo(); 
            }
        }else{
            $(".viewport-section#project-images").css("visibility", "visible"); 
            $(".viewport-section#project-images").animate({"opacity": "1.0"}, 1000);
            $("#info-link").html("TEXT"); 
            
            $(".viewport-section#project-info").animate({ 
                "opacity": "0.0"
                }, 1000, function() {
                    $("#background-logo-img").css("opacity", "1.0"); 
                    $(".viewport-section#project-info").css("display", "none"); 
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

//on mousewheel
document.addEventListener("wheel", handleMouseWheel, false);

function handleMouseWheel(event){
    if (getLocationHash() !== "About"){
        if (event.deltaY === 0){
            event.preventDefault(); 
            if (event.deltaX > 40){
                loadNextProject(); 
            }else if (event.deltaX < -40){
                loadPastProject(); 
            }
        }
    }
   
    // event.deltaY; 
}




//On arrows
document.addEventListener("keyup", handleKeyUp, false);

function handleKeyUp(event){
    // event.preventDefault();   
    if (getLocationHash() !== "About"){
        if (event.keyCode === 37){
            loadPastProject(); 
        }
        else if (event.keyCode === 39){
            loadNextProject(); 
        }
    }
} 

//On touch scroll
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);
 
var scrollingOffsetX = 25; 
var bTouchScrolling = false;
var scrollingStartX;
var scrollingStartY;
function handleTouchMove(event) {
    if (!bProjectInfo){
        event.preventDefault();
    }
    var touches = event.changedTouches;
    if (!bTouchScrolling){
        bTouchScrolling = true;
        scrollingStartX = touches[0].pageX;
        scrollingStartY = touches[0].pageY;
    }
}
 
function handleTouchEnd(event) {
    var touches = event.changedTouches;
    if (bTouchScrolling){
        bTouchScrolling = false;
        var scrollingDiffX = Math.abs(touches[0].pageX - scrollingStartX); 
        var scrollingDiffY = Math.abs(touches[0].pageY - scrollingStartY); 
        if (scrollingDiffX > scrollingDiffY){
            if (getLocationHash() !== "About"){
                if (touches[0].pageX > scrollingStartX + scrollingOffsetX){
                    loadPastProject(); 
                }
                else if (touches[0].pageX < scrollingStartX - scrollingOffsetX){
                    loadNextProject(); 
                }
            }
        }
    }
}

window.onresize = function(){
    if ($(window).width() > breakM){
        if (!$(".ps-scrollbar-y-rail").length){//If do not exist
            $(".text-container-wrapper").perfectScrollbar(); //create
            $(".ps-scrollbar-y-rail").css("visibility", "visible"); 
        }
        else{
            $(".text-container-wrapper").scrollTop(0); 
            $(".text-container-wrapper").perfectScrollbar("update"); //otherwise update
            $(".ps-scrollbar-y-rail").css("visibility", "visible"); 
        }
    }else{
        $(".text-container-wrapper").perfectScrollbar("destroy");
    }
    updateImgSrc(); 
}; 