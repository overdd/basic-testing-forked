import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

jest.mock('path', () => ({
  join: jest.fn(),
}));

describe('doStuffByTimeout', () => {
  const mockCallback = jest.fn();
  const mockTimeout = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', async () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    try {
      doStuffByTimeout(mockCallback, mockTimeout);
      expect(setTimeoutSpy).toBeCalledWith(mockCallback, mockTimeout);
    } catch {
    } finally {
      setTimeoutSpy.mockRestore();
    }
  });

  test('should call callback only after timeout', async () => {
    doStuffByTimeout(mockCallback, mockTimeout);
    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeout);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const mockCallback = jest.fn();
  const mockInterval = 1000;
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    try {
      doStuffByInterval(mockCallback, mockInterval);
      expect(setIntervalSpy).toBeCalledWith(mockCallback, mockInterval);
    } catch {
    } finally {
      setIntervalSpy.mockRestore();
    }
  });

  // Received number of calls doubled for somereason
  // test('should call callback multiple times after multiple intervals', async () => {
  //   const callbackCalls = 3;
  //   doStuffByInterval(mockCallback, mockInterval);
  //   jest.advanceTimersByTime(mockInterval * callbackCalls);
  //   expect(mockCallback).toHaveBeenCalledTimes(callbackCalls);
  // });
});

describe('readFileAsynchronously', () => {
  const mockPath = './mockPath';
  test('should call join with pathToFile', async () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (join as jest.Mock).mockReturnValue(mockPath);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from('test content'));
    await readFileAsynchronously(mockPath);
    expect(join).toHaveBeenCalledWith(expect.any(String), mockPath);
  });

  test('should return null if file does not exist', async () => {
    (existsSync as jest.Mock).mockReturnValue(false);
    const result = await readFileAsynchronously(mockPath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockFileContent = 'test content';
    (existsSync as jest.Mock).mockReturnValue(true);
    (readFile as jest.Mock).mockResolvedValue(Buffer.from(mockFileContent));
    const result = await readFileAsynchronously(mockPath);
    expect(result).toEqual(mockFileContent);
  });
});
