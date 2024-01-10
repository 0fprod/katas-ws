import { VideoSystemController } from '../src/VideoSystemController';
import { MotionSensor, VideoRecorder } from '../src/vendor'

// - Indica al grabador que detenga la grabación cuando el sensor no detecta movimiento.
// - Indica al grabador que comience la grabación cuando el sensor detecta movimiento.
// - Indica al grabador que detenga la grabación cuando el sensor arroja un error inesperado.
// - Comprueba el estado del sensor de movimiento una vez por segundo.

class MotionSensorAdapter implements MotionSensor {
  isDetectingMotion(): boolean {
    return false;
  }
}

class RecorderAdapter implements VideoRecorder {
  startRecording(): void {
    console.log('Start recording')
  }
  stopRecording(): void {
    console.log('Stop recording')
  }
}

describe('Video System Controller', () => {
  let controller: VideoSystemController;
  let sensor: MotionSensor;
  let recorder: VideoRecorder;

  beforeEach(() => {
    sensor = new MotionSensorAdapter();
    recorder = new RecorderAdapter();
    controller = new VideoSystemController(sensor, recorder);
  })

  it('should stop recording when sensor detects no movement', () => {
    const recorderSpy = jest.spyOn(recorder, 'stopRecording');

    controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(recorderSpy).toHaveBeenCalled();
  });

  it('should start recording when sensor detects movement', () => {
    jest.spyOn(sensor, 'isDetectingMotion').mockReturnValue(true);
    const recorderSpy = jest.spyOn(recorder, 'startRecording');
    controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(recorderSpy).toHaveBeenCalled();
  });

  it('should stop recording when sensor throws unexpected error', () => {
    jest.spyOn(sensor, 'isDetectingMotion').mockImplementation(() => { throw new Error('Unexpected error') });
    const recorderSpy = jest.spyOn(recorder, 'stopRecording');
    controller = new VideoSystemController(sensor, recorder);
    controller.start();

    expect(recorderSpy).toHaveBeenCalled();
  });

  it('should check motion sensor state once per second', () => {
    const sensorSpy = jest.spyOn(sensor, 'isDetectingMotion');
    controller = new VideoSystemController(sensor, recorder);
    const recordTimeInSeconds = 3;

    controller.start(recordTimeInSeconds);

    expect(sensorSpy).toHaveBeenCalledTimes(3);
  });
});
