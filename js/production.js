/*! Lazy Load 1.9.3 - MIT license - Copyright 2010-2013 Mika Tuupola */
!function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!0,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);
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

    $(".viewport-section#project-images").css("visibility", "hidden"); 
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
                    if (lastLocationHash === aboutSection.hash){
                        lastLocationHash = projects[0].hash; 
                        loadProject(0); 
                    }
                    setLocationHash(aboutSection.hash); 
            });     

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
    $(".viewport-section#project-images" ).load(projects[projectId].fileName+" .img-project-container", function() {
        setupImages($(".viewport-section#project-images"));
        if (bHomePage){
            homepageFadeIn(); 
        }
    }); 
}

function homepageFadeIn(){
    bContentTransition = true; 
    $(".viewport-section#project-images").css("opacity", "0.0"); 
    $(".viewport-section#project-images").css("visibility", "visible"); 
    $(".viewport-section#project-images").animate(
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
        
        $("#container").append('<section class="right-section"></section>'); //Add section positioned at the right of viewport
        $(".right-section").css("margin-left", "110%"); 
        $(".right-section" ).load(projects[currentProjectId].fileName+" .img-project-container", function() {
        // Finished loading
            setupImages($(".right-section")); 
            $(".right-section").animate(
                {"marginLeft": "0%"}, 
                contentTransitionTime, 
                function() {
                    // Animation complete.
                    $("viewport-section").remove();
                    $(this).addClass("viewport-section"); //Delete right-section id from div
                    $(this).removeClass("right-section"); //Delete right-section id from div
                    $(this).attr("id", "project-images"); //Add viewport-section id to div
                   
                   updateProjectNavButtons(); 
                   $("#project-name").html(projects[currentProjectId].name); 
                   $("#info-link").html("MORE&nbsp;INFO");

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
            setupImages($(".left-section")); 
            $(".left-section").animate(
                {"marginLeft": "0%"}, 
                contentTransitionTime, 
                function() {
                    // Animation complete.
                    $(this).addClass("viewport-section"); //Delete right-section id from div
                    $(this).removeClass("left-section"); //Delete right-section id from div
                    $(this).attr("id", "project-images"); //Add viewport-section id to div
                   
                   updateProjectNavButtons(); 
                   $("#project-name").html(projects[currentProjectId].name); 
                   $("#info-link").html("MORE&nbsp;INFO");

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
    }
}

function setupImages(parentDiv){
     //Initial setup of images (opacity = 1.0 for initial image)
    currentProjectImageId = 0; 
    var imgDiv = parentDiv.find(" .img-container > a > #0"); 

    console.log("ciao: "+parentDiv.find(".img-container > a > #0").attr("id")); 
    imgDiv.css( "opacity", "1.0" );
    imgDiv.attr("src", $(imgDiv).attr("data-original")).load(); 

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
    if (!bImageTransition){
        bImageTransition = true; 
        var totProjectImageNum = $( ".img-container > a" ).children().length; 
        var nextProjectImageId = currentProjectImageId+1; 
        if (nextProjectImageId === totProjectImageNum){
            nextProjectImageId = 0; 
        }
        $("#background-logo").css("opacity", "0.0"); //Set bg logo to transparent before crossfading images
        
        var imgDiv =  $( ".img-container  a > #"+nextProjectImageId ); 

        $( imgDiv ).attr("src", imgDiv.attr("data-original")).load(
            function(){
                 $(this).animate({"opacity": "1.0"}, 1000, 
                function() {

                    $( ".img-container > a > #"+currentProjectImageId ).animate({ 
                        "opacity": "0.0"
                        }, 1000);
                    $( ".img-container > a > #"+nextProjectImageId ).animate({ 
                        "opacity": "1.0"
                        }, 1000);
                    $("#background-logo").css("opacity", "1.0"); 
                    bImageTransition = false; 
                    currentProjectImageId = nextProjectImageId; 
                    updateImgNavButtons($(".viewport-section#project-images")); 
                });
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

            $("#container").append('<section class="viewport-section" id="project-info"></section>');
            $(".viewport-section#project-info" ).load(projects[currentProjectId].fileName+" .text-container-wrapper", function() {
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
            }); 

        }else{
            $(".viewport-section#project-images" ).load(projects[currentProjectId].fileName+" .img-project-container", function() {
                setupImages($(".viewport-section#project-images"));
                $( ".img-container > a" ).children().each(function(){
                    if (parseInt($(this).attr("id")) === currentProjectImageId){
                        $(this).animate({"opacity": "1.0"}, 1000, function() {});
                    }
                });
                
                $(".img-footer").animate({ "opacity": "1.0"}, 1000, function() {}); 
            }); 
            
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