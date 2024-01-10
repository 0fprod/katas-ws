import { PasswordBuilder, StrongPassword, WeakPassword } from '../src/PasswordValidatorNullObjectPattern';
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
    expect(PasswordBuilder.build("1234abcdABCD_")).toBeInstanceOf(StrongPassword);
  })

  it('return false when password has less than 6 characters', () => {
    expect(PasswordBuilder.build("1aA_")).toBeInstanceOf(WeakPassword);
  });

  it('return false when password has no numbers', () => {
    expect(PasswordBuilder.build("abcdABCD_")).toBeInstanceOf(WeakPassword);
  });

  it('return false when password has no lowercase letters', () => {
    expect(PasswordBuilder.build("1234ABCD_")).toBeInstanceOf(WeakPassword);
  });

  it('return false when password has no uppercase letters', () => {
    expect(PasswordBuilder.build("1234abcd_")).toBeInstanceOf(WeakPassword);
  });

  it('return false when password has no special characters', () => {
    expect(PasswordBuilder.build("1234abcdABCD")).toBeInstanceOf(WeakPassword);
  });
});