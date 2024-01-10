import { MotionSensor, VideoRecorder } from './vendor';

export class VideoSystemController {

  constructor(private sensor: MotionSensor, private recorder: VideoRecorder) { }

  async start(recordTimeInSeconds: number = 1) {
    for (let i = 0; i < recordTimeInSeconds; i++) {
      this.tryToRecord();
      await this.waitOneSecond()
    }
  }

  private async waitOneSecond(): Promise<void> {
    const oneSecond = 1000;
    return new Promise((resolve) => {
      setTimeout(resolve, oneSecond);
    });
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
