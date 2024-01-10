import { VideoSystemController } from '../src/VideoSystemController';
import { MotionSensor, VideoRecorder } from '../src/vendor' 
// - Indica al grabador que detenga la grabación cuando el sensor no detecta movimiento.
// - Indica al grabador que comience la grabación cuando el sensor detecta movimiento.
// - Indica al grabador que detenga la grabación cuando el sensor arroja un error inesperado.
// - Comprueba el estado del sensor de movimiento una vez por segundo.

class FakeSensor implements MotionSensor {
  isDetectingMotion(): boolean {
    return false;
  } 
}

class FakeRecorder implements VideoRecorder {
  startRecording(): void {
    console.log('Start recording')
  }
  stopRecording(): void {
    console.log('Stop recording')
  }
}

xdescribe('Video System Controller', () => {
  it('should stop recording when sensor detects no movement', () => {
    let called = false;
    const monkeyPatchedCall = () => {
      called = true;
    }
    const sensor = new FakeSensor();
    const recorder = new FakeRecorder();
    recorder.stopRecording = monkeyPatchedCall;

    const controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(called).toBeTruthy();
  });

  it('should start recording when sensor detects movement', () => { 
    let called = false;
    const monkeyPatchedCall = () => {
      called = true;
    }
    const sensor = new FakeSensor();
    const recorder = new FakeRecorder();
    sensor.isDetectingMotion = () => true;
    recorder.startRecording = monkeyPatchedCall;

    const controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(called).toBeTruthy();
  });

});
