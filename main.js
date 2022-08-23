song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;

song1_status='';
song2_status='';

scoreLeftWrist=0;
scoreRightWrist=0;

function preload(){
song2= loadSound("mood.mp3");
song1= loadSound('cradles.mp3');
}

function setup(){
canvas= createCanvas(500,400);
canvas.center();

video= createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log('Model is loaded');
}

function gotPoses(results){
if(results.length>0){
console.log(results);

leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;

rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;

scoreLeftWrist= results[0].pose.keypoints[9].score;
scoreRightWrist= results[0].pose.keypoints[10].score;
}
}

function draw(){
image(video,0,0,500,400);

song1_status=song1.isPlaying();
song2_status= song2.isPlaying();

fill("red");
stroke('red');

if(scoreLeftWrist>0.2){
    circle(leftWristX,leftWristY,30);
song2.stop();

if(song1_status==false){
song1.play();
document.getElementById('song_name').innerHTML='Playing cradles song';
}
}

if(scoreRightWrist>0.2){
    circle(rightWristX,rightWristY,30);
song1.stop();

if(song2_status==false){
song2.play();
document.getElementById('song_name').innerHTML='Playing mood song';
}
}
}

function play(){
song2.play();
song2.setVolume(0.7);
song2.rate(1);


}