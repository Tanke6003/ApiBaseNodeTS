// envs.plugin.test.ts

import * as dotenv from 'dotenv';
import { envs } from '../../../src/application/plugins/envs.plugin';

beforeAll(() => {
  dotenv.config({ path: './.env.test' });
  
});

describe('Environment Variables', () => {
  it('should envs was defined', () => {
    expect(envs).toBeDefined();
  });

  test('should contain basic info in envs', () => {
    expect(envs).toHaveProperty('PORT');
  });

  test('Should have correct types for values', () => {
    expect(typeof envs.PORT).toBe('number');
  });
});
