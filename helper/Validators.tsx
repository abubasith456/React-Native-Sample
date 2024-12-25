export function emailValidator(email: string) {
    const re = /\S+@\S+\.\S+/
    if (!email) return "Email can't be empty."
    if (!re.test(email)) return 'Ooops! We need a valid email address.'
    return ''
}

export function nameValidator(name: string) {
    if (!name) return "Name can't be empty."
    return ''
}

export function passwordValidator(password: string) {
    if (!password) return "Password can't be empty."
    if (password.length < 5) return 'Password must be at least 5 characters long.'
    return ''
}

export function confirmPasswordValidator(password: string, confirmPassword: string) {
    if (password != confirmPassword) {
        return "Password Not Matching!"
    }
    return ''
}