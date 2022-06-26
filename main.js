objects = [];
status = "";

function setup(){
    canvas = createCanvas(400 , 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}

function gotResults(error, results){
if(error){
    console.error(error);
}
console.log(results);
objects = results;
}

function draw(){
objectDetector = ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML = "Status: Finding the Object";
input = document.getElementById("input").value;
image(video, 0, 0, 380, 380);
if(status != ""){
    objectDetector.detect(video, gotResults);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "Status: Object detetcted";
        fill("red");
        stroke("red");
        percent = floor(objects[i].confidence * 100);
    text(objects[i].label+""+percent+"%", objects[i].x+15, objects[i].y+15);
    noFill();
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    if(objects[i].label == input){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("found").innerHTML = "Object Found"+input;
        synth = window.speechSynthesis;
        utterThis = new SpeechSynthesisUtterance(input+"found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("found").innerHTML = input+"not found";
    }
    }
}
}