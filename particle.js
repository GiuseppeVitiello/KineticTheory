class Particle {

    constructor(w, h, r, gauss) {

        this.x = random(0, w - 1);
        this.y = random(0, h / 2 - 1);
        this.a = random(0, 2.0 * Math.PI);

        if (!gauss) {
            this.v = random(0, vmax);  
        }
        else{
            this.v = randomGaussian(sigma, mu) + vmax/2;
        }

        this.vx = this.v * cos(this.a);
        this.vy = this.v * sin(this.a);

        this.r = r;
    }

    show(col, k) {
        fill(col);
        ellipse(this.x, this.y, k * this.r, k * this.r);
        fill(255);
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < r || this.x > width - r)
            this.vx *= -1;
        if (this.y < r || this.y > (height-3) / 2 - r)
            this.vy *= -1;
    }

    getVel() {
        return this.v;
    }
}