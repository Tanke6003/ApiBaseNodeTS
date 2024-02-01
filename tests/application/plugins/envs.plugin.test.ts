import { NUMBER } from 'sequelize';
import { envs } from '../../../src/application/plugins/envs.plugin';

describe("envs", () => {

    test("should contains in envs basic info",()=>{
        expect(envs).toHaveProperty('PORT');
        expect(envs).toHaveProperty('JWT_SECRET')
        
    })
    test("Should have a correct type value", () => {
        expect(typeof envs.PORT).toBe('number');
        expect(typeof envs.JWT_SECRET).toBe('string');
    });

});
