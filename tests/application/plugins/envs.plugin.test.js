"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envs_plugin_1 = require("../../../src/application/plugins/envs.plugin");
describe("envs", () => {
    test("should contains in envs basic info", () => {
        expect(envs_plugin_1.envs).toHaveProperty('PORT');
        expect(envs_plugin_1.envs).toHaveProperty('JWT_SECRET');
    });
    test("Should have a correct type value", () => {
        expect(typeof envs_plugin_1.envs.PORT).toBe('number');
        expect(typeof envs_plugin_1.envs.JWT_SECRET).toBe('string');
    });
});
