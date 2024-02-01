// SequelizeConnection.test.ts

import exp from "constants";
import { SequelizeConnection, SequelizeConnectionConfig } from "../../../src/application/plugins/sequelize.plugin";

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
    sequelizeConnection = new SequelizeConnection(connectionConfig);
  });

  afterEach(async () => {
    await sequelizeConnection.close();
  });

  it('should establish a database connection', async () => {
    await expect(sequelizeConnection.authenticate()).resolves.not.toThrow();
  });
  it('should return an array with an object having a property "Result" with the value 1', async () => {
    const results = await sequelizeConnection.executeQuery('SELECT 1 AS Result;');
    expect(results).toHaveLength(1);
    expect(results[0]).toHaveProperty('Result', 1);
  });
  
  

});
