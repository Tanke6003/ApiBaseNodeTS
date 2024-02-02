import { SequelizeConnection, SequelizeConnectionConfig } from "../../../src/application/plugins/sequelize.plugin";

jest.mock("../../../src/application/plugins/sequelize.plugin");

describe('SequelizeConnection', () => {
  let sequelizeConnection: SequelizeConnection;

  const connectionConfig: SequelizeConnectionConfig = {
    dialect: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'test',
    password: 'test',
    database: 'test',
  };

  beforeEach(() => {
    // @ts-ignore
    SequelizeConnection.mockClear();
    sequelizeConnection = new SequelizeConnection(connectionConfig);
  });

  afterEach(async () => {
    // @ts-ignore
    await SequelizeConnection.mock.instances[0].close();
  });

  it('should establish a database connection', async () => {
    // @ts-ignore
    SequelizeConnection.mock.instances[0].authenticate.mockResolvedValueOnce(true);

    await expect(sequelizeConnection.authenticate()).resolves.toBeTruthy();

    // @ts-ignore
    expect(SequelizeConnection.mock.instances[0].authenticate).toHaveBeenCalledTimes(1);
  });

  it('should return an array with an object having a property "Result" with the value 1', async () => {
    const expectedResults = [{ Result: 1 }];

    // @ts-ignore
    SequelizeConnection.mock.instances[0].executeQuery.mockResolvedValueOnce(expectedResults);

    const results = await sequelizeConnection.executeQuery('SELECT 1 AS Result;');

    expect(results).toHaveLength(1);
    expect(results[0]).toHaveProperty('Result', 1);

    // Verificar que el método executeQuery se llamó una vez con el argumento proporcionado
    // @ts-ignore
    expect(SequelizeConnection.mock.instances[0].executeQuery).toHaveBeenCalledWith('SELECT 1 AS Result;');
  });
});
