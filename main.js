music1 = "";
music2 = "";

leftWristX = 0;
rightWristY = 0;
leftWristY = 0;
rightWristX = 0;

statuss = "";
scoreleft = 0;
scoreright = 0;


function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("Stronger.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes)

}

function modelLoaded() {

    console.log('poseNet is loaded');
}



function gotposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log(leftWristX, leftWristY, rightWristX, rightWristY);
        scoreleft = results[0].pose.keypoints[9].score;
        scoreright = results[0].pose.keypoints[10].score;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("red");
    stroke("red");
    
    statuss = music1.isPlaying();
    if(scoreleft > 0.2){
        circle(leftWristX, leftWristY,20);
        music2.stop();


        if(statuss == false){
            music1.play();
        }
    }

    fill("red");
    stroke("red");
    
    statuss = music2.isPlaying();

    if(scoreright > 0.2){
        circle(rightWristX, rightWristY,20);
        music1.stop();


        if(statuss == false){
            music2.play();
        }
    }

}

