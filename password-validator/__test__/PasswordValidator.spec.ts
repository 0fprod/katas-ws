import { PasswordValidator } from '../src/PasswordValidator';
// Examples
// 1234abcdABCD_ ⇒ true 
// 1aA_ ⇒ false - 
// abcdABCD_ ⇒ false 
// 1234ABCD_ ⇒ false 
// 1234abcd_ ⇒ false 
// 1234abcdABCD ⇒ false

// Rules
// The password must have at least 6 characters
// The password must have at least one number
// The password must have at least one lowercase letter
// The password must have at least one uppercase letter
// The password must have at least one special character
describe('Password validator should', () => {

  it('return true when password complies all the rules', () => {
    expect(PasswordValidator.isValid("1234abcdABCD_")).toBe(true);
  })

  it('return false when password has less than 6 characters', () => {
    expect(PasswordValidator.isValid("1aA_")).toBe(false);
  });

  it('return false when password has no numbers', () => {
    expect(PasswordValidator.isValid("abcdABCD_")).toBe(false);
  });

  it('return false when password has no lowercase letters', () => {
    expect(PasswordValidator.isValid("1234ABCD_")).toBe(false);
  });

  it('return false when password has no uppercase letters', () => {
    expect(PasswordValidator.isValid("1234abcd_")).toBe(false);
  });

  it('return false when password has no special characters', () => {
    expect(PasswordValidator.isValid("1234abcdABCD")).toBe(false);
  });
});