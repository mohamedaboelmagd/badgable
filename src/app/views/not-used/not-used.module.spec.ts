import { NotUsedModule } from './not-used.module';

describe('NotUsedModule', () => {
  let notUsedModule: NotUsedModule;

  beforeEach(() => {
    notUsedModule = new NotUsedModule();
  });

  it('should create an instance', () => {
    expect(notUsedModule).toBeTruthy();
  });
});
