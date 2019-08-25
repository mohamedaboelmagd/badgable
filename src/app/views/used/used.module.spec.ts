import { UsedModule } from './used.module';

describe('UsedModule', () => {
  let usedModule: UsedModule;

  beforeEach(() => {
    usedModule = new UsedModule();
  });

  it('should create an instance', () => {
    expect(usedModule).toBeTruthy();
  });
});
