export interface Password { }

export class StrongPassword implements Password {

}
export class WeakPassword implements Password {

}

export class PasswordBuilder {

  public static build(password: string): Password {
    const isStrongPassword = this.hasMoreThan6Characters(password)
      && this.hasAtLeastOneNumber(password)
      && this.hasAtLeastOneLowercaseLetter(password)
      && this.hasAtLeastOneUppercaseLetter(password)
      && this.hasAtLeastOneUnderscore(password)

    return isStrongPassword ? new StrongPassword() : new WeakPassword()
  }

  private static hasMoreThan6Characters(password: string): boolean {
    return password.length >= 6
  }

  private static hasAtLeastOneNumber(password: string): boolean {
    return /[\d]/.test(password)
  }

  private static hasAtLeastOneLowercaseLetter(password: string): boolean {
    return /[a-z]/.test(password)
  }

  private static hasAtLeastOneUppercaseLetter(password: string): boolean {
    return /[A-Z]/.test(password)
  }

  private static hasAtLeastOneUnderscore(password: string): boolean {
    return /[_]/.test(password)
  }
} 