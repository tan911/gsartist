import bcrypt from 'bcryptjs'

export function hashPassword(pwrd: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(pwrd, salt)
}

export type HashPassword = (pwrd: string) => string
