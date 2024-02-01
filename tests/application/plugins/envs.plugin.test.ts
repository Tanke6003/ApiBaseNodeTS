// envs.plugin.test.ts

import 'dotenv/config';


import { envs } from '../../../src/application/plugins/envs.plugin';

describe('Environment Variables', () => {
  // Configura las variables de entorno para las pruebas
  beforeAll(() => {
    // Este bloque se ejecuta antes de todas las pruebas
    process.env.PORT = '3000'; // Define un valor para PORT para las pruebas
    // Puedes definir otros valores para otras variables aquí
  });

  afterAll(() => {
    // Este bloque se ejecuta después de todas las pruebas
    delete process.env.PORT; // Limpia la variable de entorno después de las pruebas
    // Puedes limpiar otras variables aquí si es necesario
  });

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
