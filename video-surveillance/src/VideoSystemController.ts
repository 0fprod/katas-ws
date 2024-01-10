import { MotionSensor, VideoRecorder } from './vendor';

export class VideoSystemController {

  constructor(private sensor: MotionSensor, private recorder: VideoRecorder) { }

  start(recordTimeInSeconds: number = 1) {
    for (let i = 0; i < recordTimeInSeconds; i++) {
      this.tryToRecord();
      this.waitOneSecond()
    }
  }

  private waitOneSecond(): void {
    const oneSecond = 1000;
    let startTime = new Date().getTime();
    let endTime = startTime + oneSecond;
    while (startTime < endTime) {
      startTime = new Date().getTime();
    }
  }

  private tryToRecord() {
    try {
      if (this.sensor.isDetectingMotion()) {
        this.recorder.startRecording();
      } else {
        this.recorder.stopRecording();
      }
    } catch (error) {
      this.recorder.stopRecording();
    }
  }
}
