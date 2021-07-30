import AbstractGenerator from './index';
import GeneratorService from '../../Services/Generator';
import { GeneratorServiceInterface } from '../../Services/Generator/GeneratorService';
import TestClass from '@michalicat/test-class/lib';

class MyClass extends AbstractGenerator {
  public execute(): void {
    return;
  }
}

describe('assertion testing', () => {
  it('should get absolute Path', () => {
    const { instance: testGeneratorService, methodsToMockMap } =
      TestClass.testClassFor<GeneratorService, GeneratorServiceInterface>(
        new GeneratorService()
      );

    const template = 'TEMPLATE';
    const targetFolder = './test';
    const data = {
      greetings: 'Fitfox',
    };

    const testClass = new MyClass(testGeneratorService);

    testClass['render'](template, targetFolder, data);

    expect(methodsToMockMap.setTemplate).toHaveBeenCalledWith(template);
    expect(methodsToMockMap.render).toHaveBeenCalledWith(targetFolder, data);
  });
});
