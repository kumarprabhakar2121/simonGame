
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started=false;
var level=0;

$(document).keypress(function(){
  if(!started)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(((userClickedPattern.length)-1));

});

function nextSequence() {
  //alert("nextsequence");
  level++;
  userClickedPattern=[];
  $("#level-title").text("level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);},1000);
  
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
  {
    
   if (userClickedPattern.length === gamePattern.length){

    setTimeout(function () {  nextSequence(); }, 800);

  }
  }
  else
  {

    playSound("wrong");
    $(".bodyClass").addClass("game-over");
    
    setTimeout(function(){
      $(".bodyClass").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  }

} 

function startOver(){
$(".level-title").text("Press A Key to Start");
level=0;
gamePattern=[];
started=false;
}


//PRABHAKAR KUMAR