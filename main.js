
var fullLength;

function init(lengthOfPeriodInSeconds) {

  fullLength = lengthOfPeriodInSeconds * 10;
  $(".marker").remove();

  console.log("Length of each period is set to " + lengthOfPeriodInSeconds + " seconds.");

}



function addAction(timeInSeconds, team) {

  var percentagePlacement = Math.round((timeInSeconds / fullLength) * 100);
  if( percentagePlacement > 0 && percentagePlacement < 100) {
    if( team == "HOME" ) {
      var marker = document.createElement("div");
      marker.className = "homeMarker marker";
      marker.style.left = percentagePlacement + "%";
      document.getElementById("timeline").appendChild(marker);
    }
    else if ( team == "AWAY" ) {
      var marker = document.createElement("div");
      marker.className = "awayMarker marker";
      marker.style.left = percentagePlacement + "%";
      document.getElementById("timeline").appendChild(marker);
    }
  } else {
    console.warn("Action outside of the range of the timeline.");
  }

  checkOverlap();

}


function checkOverlap() {

  var arrayOfPositions = [];
  $(".combinedMarker").remove();

  for(let i = 0; i < $(".marker").length; i++) {
	   arrayOfPositions.push( ((Number($(".marker")[i].style.left.slice(0, -1))) / 100) * ($(window).width() * .9) );
     $(".marker")[i].style.display = "";
  }


  for(let i = 0; i < arrayOfPositions.length; i++) {
    for(let j = i+1; j < arrayOfPositions.length; j++) {
      if( arrayOfPositions[i] <= arrayOfPositions[j] && arrayOfPositions[i]+ 7 >= arrayOfPositions[j] || arrayOfPositions[i] >= arrayOfPositions[j] && arrayOfPositions[i]- 7 <= arrayOfPositions[j]) {
        $(".marker")[i].style.display = "none";
        $(".marker")[j].style.display = "none";
        var numRep = document.createElement("p")
        numRep.className = "combinedMarker marker";
        numRep.style.left = $(".marker")[i].style.left;
        numRep.innerHTML = "2";
        document.getElementById("timeline").appendChild(numRep);
      }
    }
  }





  // for(let i = 0; i < arrayOfPositions.length; i++) {
  //   var count = 1;
  //   for(let j = i+1; j < arrayOfPositions.length; j++) {
  //     if( arrayOfPositions[i] <= arrayOfPositions[j] && arrayOfPositions[i]+ 7 >= arrayOfPositions[j] || arrayOfPositions[i] >= arrayOfPositions[j] && arrayOfPositions[i]- 7 <= arrayOfPositions[j]) {
  //       count++;
  //       $(".marker")[i].style.display = "none";
  //       $(".marker")[j].style.display = "none";
  //       var numRep = document.createElement("p")
  //       numRep.className = "combinedMarker marker";
  //       numRep.style.left = $(".marker")[i].style.left;
  //     }
  //   }
  //   if( count > 1) {
  //     numRep.innerHTML = String(count);
  //     document.getElementById("timeline").appendChild(numRep);
  //     count = 1;
  //   }
  // }


}


$(window).resize( checkOverlap );
