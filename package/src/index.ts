// User Delta Info
interface UserData {
  id: number;
  timeOnPage: number;
  clicks: number;
}

class Purelytics {

  private steps: number = 0;
  private deltaUserData: UserData;
  private userDataLogs: UserData[];

  private interval: number;
  private expected: number;

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

  private listen() {
    window.addEventListener('click', (event) => {
      this.deltaUserData.clicks++;
      console.log(event);
    });
  }

  private step() {
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
    setTimeout(
      () => {
        this.steps++;
        this.step();
      },
      Math.max(0, this.interval - drift) // take into account drift
    );
  }


  private resetDeltaUserData() {
    this.deltaUserData = {
      id: 0,
      timeOnPage: 0,
      clicks: 0,
    };
  }

  public getUserDataLogs() {
    return this.userDataLogs;
  }

}

const purelytics = new Purelytics();
//sed -i '' 's/$version/'"${BUILD_NUMBER}"'/g' dist/README.md
// sed -i '' 's/$version/'"${BUILD_NUMBER}"'/g' dist/package.json
