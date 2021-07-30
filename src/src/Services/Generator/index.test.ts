import GeneratorService from './GeneratorService';
import FileService from '../FileService';
import { FileServiceInterface } from '../FileService/FileService';
import TestClass from '@michalicat/test-class/lib';

describe('assertion testing', () => {
  it('should setTemplate', () => {
    const generatorService = new GeneratorService();
    const template = 'template';

    generatorService.setTemplate(template);

    expect(generatorService['_template']).toBe(template);
  });

  it('should call readFIle from fileService', () => {
    const { instance: testFileService, methodsToMockMap } =
      TestClass.testClassFor<FileService, FileServiceInterface>(
        new FileService()
      );

    const generatorService = new GeneratorService(testFileService);
    const template = 'template';
    const targetPath = 'targetPath';
    const data = {
      greetings: 'Fitfox',
    };

    generatorService.setTemplate(template);
    generatorService.render(targetPath, data);

    expect(methodsToMockMap.readFile).toHaveBeenCalled();
  });
});
