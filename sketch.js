let particles = [];
let N = 1250;
let r = 3;

let sp;

let vmax = 15;
let dv = 0.01;
let nInt = vmax / dv;
let velCount = [];
for (let i = 0; i < nInt; i++) {
    velCount[i] = 0;
}

let nWid;
let maxV = 0;


let kb = 1.38;
let dist, fx, fxtot, v2m, ftot, Ecm, pr, Temp, Ecmtot, vqm, alpha, sigma, mu, sphere, lcm, cs;
let vars = document.getElementsByClassName('value');


function getDN() {
    for (let i = 0; i < nInt; i++) {
        for (let p of particles) {
            if (p.getVel() > i * dv && p.getVel() < (i + 1) * dv) {
                velCount[i]++;
            }
        }
    }
    for (let i = 0; i < nInt; i++) {
        if (velCount[i] > maxV) {
            maxV = velCount[i];
        }
    }
}

function getV2mean() {
    let vm = 0;
    for (let p of particles) {
        vm += p.getVel() * p.getVel();
    }
    return vm / N;
}

function ca(num, prec) {
    if(!prec) prec = 4;
    return Math.floor(pow(10, prec)*num)/pow(10, prec);
}


function setup() {
    createCanvas(450, 503);
    for (let i = 0; i < N; i++) {
        p = new Particle(width, height, r, true);
        particles.push(p);
    }
    sp = new Particle(width, height, r);
    particles.push(sp);

    getDN();

    dist = Math.hypot(width, (height - 3) / 2);

    fx = Math.pow(sp.getVel(), 2) / dist;
    vars[0].innerHTML += ca(fx) + " N";

    fxtot = N * fx;
    vars[1].innerHTML += ca(fxtot) + " N";

    v2m = getV2mean();
    vars[2].innerHTML += ca(v2m) + " m/s";

    ftot = (N * v2m) / (3 * dist);
    vars[3].innerHTML += ca(ftot) + " N";

    Ecm = 0.5 * v2m;
    vars[4].innerHTML += ca(Ecm) + " J";

    pr = (2 * N * Ecm) / (3 * dist);
    vars[5].innerHTML += ca(pr) + " Pa";

    Temp = (2 * Ecm) / (3 * kb);
    vars[6].innerHTML += ca(Temp) + " K";

    Ecmtot = 3 * N * Temp / 2;
    vars[7].innerHTML += ca(Ecmtot) + " J";

    vqm = Math.sqrt(v2m);
    vars[8].innerHTML += ca(vqm) + " m/s";

    alpha = vqm * Math.sqrt(2.0 / 3.0);
    sigma = 1.0 / (4 * N * Math.SQRT2 * vqm * vqm * Math.pow(alpha, 3));
    mu = vqm * (1 - alpha * sigma * Math.SQRT2);

    sphere = 4 * Math.PI * r * r;
    vars[9].innerHTML += ca(sphere) + " m²";

    lcm = 1 / (4 * Math.PI * r * r);
    vars[10].innerHTML += ca(lcm);

    cs = vqm / lcm;
    vars[11].innerHTML += ca(cs);

}

function draw() {
    let c = color('rgb(0,0,0)');
    let pc = color('rgb(19, 158, 1)');
    background(c);
    for (let i = 0; i < particles.length; i++) {
        if (i == particles.length - 1) {
            particles[i].show(pc, 2.5);
            particles[i].move();
        } else {
            particles[i].show(128, 1);
            particles[i].move();
        }
    }

    stroke(255);

    strokeWeight(3);
    line(0, height / 2 + 10, width, height / 2 + 10);

    strokeWeight(1);
    textSize(15);

    line(10, height - 20, width - 10, height - 20);
    text('v', width - 20, height - 5);

    line(20, height - 10, 20, height / 2 + 25);
    text('n', 5, height / 2 + 40);

    nWid = (width - 20 - 10) / nInt;
    translate(20, height - 20);
    for (let i = 0; i < nInt; i++) {
        rect(3 + i * nWid, 0, nWid - 0.4, -height * velCount[i] / 50);
    }

    stroke(0);
    translate(-20, 20 - height);



}












