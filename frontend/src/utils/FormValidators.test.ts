import { checked, isEmpty, passwd, validatePasswords, validEmail } from './FormValidators';

describe('Form validators', () => {
    it('Should create a validator for checkbox (case 1)', () => {
        const validator = checked('Test');
        const result = validator(false);
        expect(result).toEqual('Test');
    });

    it('Should create a validator for checkbox (case 2)', () => {
        const validator = checked('Test');
        const result = validator(true);
        expect(result).toEqual(undefined);
    });

    it('Should create a validator for empty input (case 1)', () => {
        const validator = isEmpty('Test');
        const result = validator(undefined);
        expect(result).toEqual('Test cannot be empty');
    });

    it('Should create a validator for empty input (case 2)', () => {
        const validator = isEmpty('Test');
        const result = validator('testing');
        expect(result).toEqual(undefined);
    });

    it('Should create a validator for email (case 1)', () => {
        const validator = validEmail('test@localhost.com');
        expect(validator).toEqual(undefined);
    });

    it('Should create a validator for email (case 2)', () => {
        const validator = validEmail('test@localhost');
        expect(validator).toEqual('E-mail address is invalid');
    });

    it('Should create a validator for password (case 1)', () => {
        const validator = passwd(4);
        const res = validator('testing');
        expect(res).toEqual(undefined);
    });

    it('Should create a validator for password (case 2)', () => {
        const validator = passwd(10);
        const res = validator('testing');
        expect(res).toEqual('Password cannot be empty or shorter than 10 characters');
    });

    it('Should create a validator for password (case 1)', () => {
        const validator = validatePasswords(undefined, {
            password: 'test',
            passwordAgain: 'test',
        });
        expect(validator).toEqual(undefined);
    });

    it('Should create a validator for password (case 2)', () => {
        const validator = validatePasswords(undefined, {
            password: 'test',
            passwordAgain: 'test2',
        });
        expect(validator).toEqual('Passwords do not match');
    });

    it('Should create a validator for password (case 3)', () => {
        const validator = validatePasswords(undefined, {
            password: 'test',
        });
        expect(validator).toEqual('Please type your password again');
    });
});
