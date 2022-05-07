let canvas;
var pg, click;


var N;
var W;
var D;
var CD;

let helvetica;
let blurShader;

var shouldReset = true;

var firstClick = false;

function preload() {
    helvetica = loadFont('assets/HelveticaNeueBd.ttf');
    blurShader = loadShader('assets/blur.vert', 'assets/blur.frag');

}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pg = createGraphics(width, height, WEBGL);
    click = createGraphics(width, height);

    canvas.elt.addEventListener('touchstart', handleStart);
    canvas.elt.addEventListener('touchend', handleEnd);

    click.colorMode(HSB, 100);
    click.background(10);
    click.textFont(helvetica);
    click.textAlign(CENTER, CENTER);
    click.fill(90);
    if(width < height)
        click.textSize(130);
    else
        click.textSize(200);
    click.text('Click', width/2, height/2);
}

function draw(){
    if(shouldReset || frameCount == 2){
        reset();
        shouldReset = false;
    }

    tride();

    if(!firstClick && millis() > 3400 && millis() < 3900){
        shaderOnCanvas(click);
    }
    else{
        shaderOnCanvas(pg);
    }
    //print(pg)
    image(pg, -width/2, -height/2, width, height);
}

function reset(){
    randomSeed(random(millis()));
    noiseSeed(random(millis()*12.314));

    blurShader.setUniform('texelSize', [1 / width, 1 / height]);
    blurShader.setUniform('grunge', random(1.6));
    blurShader.setUniform('grunge2', random(0.3, 0.6));
    blurShader.setUniform('frq1', random(0.003, 0.008));
    blurShader.setUniform('frq2', random(0, 1));
    blurShader.setUniform('frq3', random(0, 1));
    blurShader.setUniform('frq4', random(0, 1));
    blurShader.setUniform('frq5', random(0, 1));
    blurShader.setUniform('frq6', random(0, 1));
}

function tride(){
    pg.clear();
    pg.ortho(-width / 2, width / 2, height / 2, -height / 2, -100, 2000);

    pg.colorMode(HSB, 100);
    pg.rectMode(CENTER);
    pg.background(90);

    var wwidth = min(width, height) * 0.6;
    var wheight = wwidth;

    pg.stroke(20);
    pg.noFill();
    //pg.translate(width/2, height/2);
    pg.rect(0, 0, wwidth, wheight);
    
    pg.noStroke();
    pg.fill(0);

    pg.push();
    //pg.rotateX(frameCount*0.005);
    //pg.rotateY(frameCount*0.005);
    pg.rotateX(PI/4);
    pg.rotateY(PI/4);

    var c1 = pg.color(0, 0, 20);
    var c2 = pg.color(0, 0, 10);

    for(var k = 0; k < 10; k++){
        pg.push();

        var x = -200 + (1000*noise(k*31.41))%400;
        var y = 0;
        var z = -200 + (1000*noise(k*31.41+3841.31))%400;

        var bw = 20 + (1000*noise(k*31.41+3841.31))%200;
        var bh = 20 + (1000*noise(k*31.41+1141.51))%200;
        var bd = 20 + (1000*noise(k*31.41+888.231))%20;

        var rw = 20 + (1000*noise(k*31.41+3841.31))%20;
        var rh = 20 + (1000*noise(k*31.41+1141.51))%20;
        var rd = 20 + (1000*noise(k*31.41+888.231))%20;

        pg.translate(x, y, z);
        //pg.rotateX(rw);
        //pg.rotateY(-frameCount*0.005);
        pg.rotateZ(PI/2);

        // UP
        pg.fill(c1);
        pg.beginShape();
        pg.vertex(-bw, +bh, -bd);
        pg.vertex(-bw, +bh, +bd);
        pg.vertex(+bw, +bh, +bd);
        pg.vertex(+bw, +bh, -bd);
        pg.endShape();
        // DOWN
        pg.fill(c2);
        pg.beginShape();
        pg.vertex(-bw, -bh, -bd);
        pg.vertex(-bw, -bh, +bd);
        pg.vertex(+bw, -bh, +bd);
        pg.vertex(+bw, -bh, -bd);
        pg.endShape();
        // RIGHT
        pg.beginShape();
        pg.fill(c2);
        pg.vertex(+bw, -bh, -bd);
        pg.vertex(+bw, -bh, +bd);
        pg.fill(c1);
        pg.vertex(+bw, +bh, +bd);
        pg.vertex(+bw, +bh, -bd);
        pg.endShape();
        // LEFT
        pg.beginShape();
        pg.fill(c2);
        pg.vertex(-bw, -bh, -bd);
        pg.vertex(-bw, -bh, +bd);
        pg.fill(c1);
        pg.vertex(-bw, +bh, +bd);
        pg.vertex(-bw, +bh, -bd);
        pg.endShape();
        // FRONT
        pg.beginShape();
        pg.fill(c2);
        pg.vertex(-bw, -bh, +bd);
        pg.fill(c1);
        pg.vertex(-bw, +bh, +bd);
        pg.vertex(+bw, +bh, +bd);
        pg.fill(c2);
        pg.vertex(+bw, -bh, +bd);
        pg.endShape();
        // BACK
        pg.beginShape();
        pg.fill(c2);
        pg.vertex(-bw, -bh, -bd);
        pg.fill(c1);
        pg.vertex(-bw, +bh, -bd);
        pg.vertex(+bw, +bh, -bd);
        pg.fill(c2);
        pg.vertex(+bw, -bh, -bd);
        pg.endShape();

        pg.pop();
    }

    pg.pop();

}


function vase(){
    pg.clear();
    pg.ortho(-width / 2, width / 2, height / 2, -height / 2, -1000, 1000);

    pg.colorMode(HSB, 100);
    pg.rectMode(CENTER);
    pg.background(90);

    var wwidth = min(width, height) * 0.6;
    var wheight = wwidth;

    pg.stroke(20);
    pg.noFill();
    pg.push();
    //pg.translate(width/2, height/2);
    pg.rect(0, 0, wwidth, wheight);
    
    pg.noStroke();
    pg.fill(10);

    //pg.rotateX(frameCount*0.02);
    pg.rotateY(frameCount*0.003);


    var vheight = 60 + 60*noise(38931);
    var detail = 5;
    var rows = round(vheight/detail);
    detail = vheight/rows;
    vheight = rows*detail;

    var numPoints = 36;
    var angleStep = 360./numPoints;
    pg.fill(0);
    pg.noStroke();
    var rr1 = round(0 + 1*(noise(22231)*10)%1.0);
    var rr2 = round(2 + 2*(noise(84738)*10)%1.0);
    var exp = .5 + 2.*(noise(12345)*10)%1.0;
    var rad1 = 50 + 100*((noise(88599.841)*10)%1.0);
    var rad2 = rad1 + 50*((noise(913927.841)*10)%1.0);
    for(var row=0; row < rows-1; row++){
    //for(var row=0; row < 1; row++){

        var angle = 0;
        var ry1 = row*detail;
        var ry2 = (row+1)*detail;
        var r1 = 30 + 140*power(noise(row*0.03), 3);
        var r2 = 30 + 140*power(noise((row+1)*0.03), 3);

        r1 = rad1 + (rad2-rad1)*power(map(row, 0, rows, 0, 1), exp);
        r2 = rad1 + (rad2-rad1)*power(map(row+1, 0, rows, 0, 1), exp);

        for (let i = 0; i < numPoints; i++) {
            let px1 = cos(radians(angle)) * r1;
            let pz1 = sin(radians(angle)) * r1;
            let py1 = ry1;
            let px2 = cos(radians(angle)) * r2;
            let pz2 = sin(radians(angle)) * r2;
            let py2 = ry2;
            let px3 = cos(radians(angle+angleStep)) * r2;
            let pz3 = sin(radians(angle+angleStep)) * r2;
            let py3 = ry2;
            let px4 = cos(radians(angle+angleStep)) * r1;
            let pz4 = sin(radians(angle+angleStep)) * r1;
            let py4 = ry1;
            pg.beginShape();
            pg.vertex(px4, py4, pz4);
            pg.vertex(px3, py3, pz3);
            pg.vertex(px2, py2, pz2);
            pg.vertex(px1, py1, pz1);
            pg.fill(10);
            if((i+row*rr1)%rr2 < 0.01)
                pg.fill(90);
            pg.endShape();
            angle += angleStep;
        }
    }
    pg.pop();

}




function krugovi(){
    randomSeed(random(millis()));
    noiseSeed(random(millis()*12.314));

    blurShader.setUniform('texelSize', [1 / width, 1 / height]);
    blurShader.setUniform('grunge', random(1.6));
    blurShader.setUniform('grunge2', random(0.3, 0.6));
    blurShader.setUniform('frq1', random(0.003, 0.008));
    blurShader.setUniform('frq2', random(0, 1));
    blurShader.setUniform('frq3', random(0, 1));
    blurShader.setUniform('frq4', random(0, 1));
    blurShader.setUniform('frq5', random(0, 1));
    blurShader.setUniform('frq6', random(0, 1));


    pg.colorMode(HSB, 100);
    pg.rectMode(CENTER);
    pg.background(90);

    var wwidth = min(width, height) * 0.6;
    var wheight = wwidth;

    pg.stroke(20);
    pg.noFill();
    pg.push();
    pg.translate(width/2, height/2);
    pg.rect(0, 0, wwidth, wheight);

    N = round(random(3))*0+13;
    for(var k = 0; k < N; k++){
        var ri = round(random(5))*0;
        if(ri == 0){
            var nn = 3;
            nn = ceil(nn/2)*2;
            var x = round(random(0, nn-1))/(2-1.)*wwidth/nn - (nn-1)/2*wwidth/nn;
            var y = round(random(0, nn-1))/(2-1.)*wheight/nn - (nn-1)/2*wheight/nn;
            var w = 20;
            var h = 20;
            if(y>0){
                h = (wheight/2 - y)*2;
            }
            else{
                h = (y - (-wheight/2))*2;
            }
            if(x>0){
                w = (wwidth/2 - x)*2;
            }
            else{
                w = (x - (-wwidth/2))*2;
            }
            var d = min(w, h);


            if(random(100) < 90){
                if(random(100) < 50){
                    if(random(100) < 50){
                        pg.fill(10);
                        pg.noStroke();
                    }
                    else{
                        pg.fill(90);
                        pg.stroke(10);
                    }
                }
                else{
                    pg.noFill();
                    pg.stroke(10);
                }
                pg.ellipse(x, y, d+.0, d+.0);
            }
            else {
                pg.fill(10);
                pg.noStroke();
                pg.rect(x, y, d+.0, d+.0);
            }  
        }
    }

    pg.pop();
}



function shaderOnCanvas(tex){
    blurShader.setUniform('tex0', tex);
    shader(blurShader);
    fill(255);
    rect(-width/2, -height/2, width, height);
}

function mouseClicked(){
    if(width > height){
        reset();
    }
    firstClick = true;
}


function handleStart(){
    if(width < height){
        reset();
    }
    firstClick = true;
}

function keyPressed(){
    reset();
    firstClick = true;
}


function handleEnd(){
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pg = createGraphics(width, height);
    reset();
}

function power(p, g) {
    if (p < 0.5)
        return 0.5 * pow(2*p, g);
    else
        return 1 - 0.5 * pow(2*(1 - p), g);
}