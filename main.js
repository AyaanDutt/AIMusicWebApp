song1Status = "";
song2Status = "";

leftwristX = 0;
leftwristY = 0;
rightwristY = 0;
rightwristX = 0;
leftWristScore = 0;
rightWristScore = 0;
rightWrist = 0;



music1 = "";
music2 = "";

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("Pose", gotPoses);
    
}

function modelLoaded() {
    console.log("poseNet is intialized!");
}


function preload(){
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();
    
    if(scoreleftWrist > 0.2) { 
        circle(leftWristX,leftWristY,20);
        song2.stop();
    
        if(song1_status == false) { 
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song" 
    } 
}
    if(scorerightWrist > 0.2) { 
        circle(rightWristX,rightWristY,20);
        song1.stop();
    
        if(song2_status == false) { 
            song2.play(); 
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song" 
    } 
}

}

function gotPoses(results) {
    if(results.length > 0 ){
        console.log(results);
        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristScore = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        rightWrist = results[0].pose.keypoints[10].score;
        

    }
}
