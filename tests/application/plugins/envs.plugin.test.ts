// envs.plugin.test.ts

import * as dotenv from 'dotenv';
import { envs } from '../../../src/application/plugins/envs.plugin';

// Asegúrate de que las variables de entorno estén cargadas antes de las pruebas
beforeAll(() => {
  dotenv.config({ path: './.env.test' });
  console.log(envs);
});

describe('Environment Variables', () => {
  it('should have a valid PORT', () => {
    expect(envs.PORT).toBeDefined();
    expect(envs.PORT).toBe(3000);
  });

  // Pruebas adicionales basadas en tu código original
  test('should contain basic info in envs', () => {
    expect(envs).toHaveProperty('PORT');
  });

  test('Should have correct types for values', () => {
    expect(typeof envs.PORT).toBe('number');
  });
});
