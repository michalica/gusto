import FileService from './FileService';
import * as fs from 'fs';
import * as fse from 'fs-extra';

jest.mock('fs');
jest.mock('fs-extra');

describe('assertion testing', () => {
  it('should call readFile from fs', () => {
    const fileService = new FileService();
    const callback = jest.fn();

    fileService.readFile('filename', callback);

    expect(fs.readFile).toHaveBeenCalled();
  });

  it('should call writeFile from fse', () => {
    const fileService = new FileService();

    fileService.writeFile('filename', 'data');

    expect(fse.outputFile).toHaveBeenCalledWith('filename', 'data');
  });
});
