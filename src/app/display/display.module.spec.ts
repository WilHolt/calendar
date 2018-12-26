import { DisplayModule } from './display.module';

describe('DisplayModule', () => {
  let displayModule: DisplayModule;

  beforeEach(() => {
    displayModule = new DisplayModule();
  });

  it('should create an instance', () => {
    expect(displayModule).toBeTruthy();
  });
});
