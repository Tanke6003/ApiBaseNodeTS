/**
 * @swagger
 * components:
 *   schemas:
 *     UserDTO:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the user
 *           example: 1
 *           required: true
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: 'John'
 *         email:
 *           type: string
 *           description: Email of the user
 *           example: 'john@example.com'
 *         password:
 *           type: string
 *           description: Password of the user
 *           example: 'pass123'
 *         birthDate:
 *           type: string
 *           format: date
 *           description: BirthDate of the user (in YYYY-MM-DD format)
 *           example: '1999-03-10'
 *         available:
 *           type: boolean
 *           description: Indicates if the user is available
 */
export interface UserDTO{
    id:number;
    name:string;
    email:string;
    password:string;
    birthDate:Date;
    available:boolean;
}