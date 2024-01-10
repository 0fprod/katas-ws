import { Observable, Subscription } from 'rxjs';
import { MotionSensor, VideoRecorder } from './vendor';

export class VideoSystemController {
  private suscription: Subscription;
  private sensorObserver: Observable<boolean>;

  constructor(private sensor: MotionSensor, private recorder: VideoRecorder) {
    this.sensorObserver = new Observable<boolean>((observer) => {
      observer.next(this.sensor.isDetectingMotion());
    });
  }

  start() {
    if (!this.suscription) {
      this.suscription = this.sensorObserver.subscribe({
        next: this.onSensorDetectionHandler.bind(this),
        error: this.onSensorStop.bind(this),
        complete: this.onSensorStop.bind(this),
      });
    }
  }

  stop() {
    this.suscription.unsubscribe();
  }

  private onSensorDetectionHandler(isDetectingMotion: boolean) {
    this.tryToRecord(isDetectingMotion);
  }

  private onSensorStop(error: any) {
    error && console.error(error);
    this.recorder.stopRecording();
  }

  private tryToRecord(isDetectingMotion: boolean) {
    if (isDetectingMotion) {
      this.recorder.startRecording();
    } else {
      this.recorder.stopRecording();
    }
  }
}
