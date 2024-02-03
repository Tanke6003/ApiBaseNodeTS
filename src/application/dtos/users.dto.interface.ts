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
 *         firstName:
 *           type: string
 *           description: Name of the user
 *           example: 'John'
 *           required: true
 *         lastName:
 *           type: string
 *           description: Last name of the user
 *           example: 'Doe'
 *           required: true
 *         nickName:
 *           type: string
 *           description: Nickname of the user
 *           example: 'johndoe'
 *           required: true
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
    firstName:string;
    lastName:string;
    nickName:string;
    email:string;
    password:string;
    birthDate:Date;
    available:boolean;
}