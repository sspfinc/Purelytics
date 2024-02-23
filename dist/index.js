"use strict";
class Purelytics {
    steps = 0;
    deltaUserData;
    userDataLogs;
    interval;
    expected;
    constructor() {
        this.deltaUserData = {
            id: 0,
            timeOnPage: 0,
            clicks: 0,
        };
        this.userDataLogs = [];
        this.interval = 5000;
        this.expected = Date.now() + this.interval;
        this.listen();
        setTimeout(() => {
            this.step();
        }, this.interval);
    }
    listen() {
        window.addEventListener('click', (event) => {
            this.deltaUserData.clicks++;
            console.log(event);
        });
    }
    step() {
        // Debugging
        console.log('Step: ', this.steps);
        // Calculate the drift
        const drift = Date.now() - this.expected; // the drift (positive for overshooting)
        if (drift > this.interval) {
            console.log('Drifted too far! Most Liked to be a tab inactive.');
        }
        // Update the user data and push it to the logs
        this.deltaUserData.timeOnPage = this.interval + drift;
        this.userDataLogs.push(this.deltaUserData);
        this.resetDeltaUserData();
        // Schedule the next update
        this.expected += this.interval;
        setTimeout(() => {
            this.steps++;
            this.step();
        }, Math.max(0, this.interval - drift) // take into account drift
        );
    }
    resetDeltaUserData() {
        this.deltaUserData = {
            id: 0,
            timeOnPage: 0,
            clicks: 0,
        };
    }
    getUserDataLogs() {
        return this.userDataLogs;
    }
}
const purelytics = new Purelytics();
//# sourceMappingURL=index.js.map