import { VideoSystemController } from '../src/VideoSystemController';
import { MotionSensor, VideoRecorder } from '../src/vendor' 
// - Indica al grabador que detenga la grabación cuando el sensor no detecta movimiento.
// - Indica al grabador que comience la grabación cuando el sensor detecta movimiento.
// - Indica al grabador que detenga la grabación cuando el sensor arroja un error inesperado.
// - Comprueba el estado del sensor de movimiento una vez por segundo.

class FakeSensorWithoutMotion implements MotionSensor {
  isDetectingMotion(): boolean {
    return false;
  } 
}

class FakeSensorWithMotion implements MotionSensor {
  isDetectingMotion(): boolean {
    return true;
  } 
}

class FakeRecorderSpy implements VideoRecorder { 
  public startRecordingCalled = false;
  public stopRecordingCalled = false;
  startRecording(): void {
    console.log('Start recording')
    this.startRecordingCalled = true;
  }
  stopRecording(): void {
    console.log('Stop recording')
    this.stopRecordingCalled = true;
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
    const sensor = new FakeSensorWithoutMotion();
    const recorder = new FakeRecorderSpy();

    const controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(recorder.startRecordingCalled).toBeFalsy();
    expect(recorder.stopRecordingCalled).toBeTruthy();
  });

  it('should start recording when sensor detects movement', () => { 
    const sensor = new FakeSensorWithMotion();
    const recorder = new FakeRecorderSpy();

    const controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(recorder.startRecordingCalled).toBeTruthy();
    expect(recorder.stopRecordingCalled).toBeFalsy()
  });

});
