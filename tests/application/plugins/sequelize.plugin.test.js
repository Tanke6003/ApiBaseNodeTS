"use strict";
// SequelizeConnection.test.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_plugin_1 = require("../../../src/application/plugins/sequelize.plugin");
describe('SequelizeConnection', () => {
    let sequelizeConnection;
    const connectionConfig = {
        dialect: 'mariadb',
        host: 'localhost',
        port: 3306,
        username: 'test',
        password: 'test',
        database: 'test',
    };
    beforeEach(() => {
        sequelizeConnection = new sequelize_plugin_1.SequelizeConnection(connectionConfig);
    });
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelizeConnection.close();
    }));
    it('should establish a database connection', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(sequelizeConnection.authenticate()).resolves.not.toThrow();
    }));
    it('should return an array with an object having a property "Result" with the value 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const results = yield sequelizeConnection.executeQuery('SELECT 1 AS Result;');
        expect(results).toHaveLength(1);
        expect(results[0]).toHaveProperty('Result', 1);
    }));
});
