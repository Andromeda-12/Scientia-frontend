export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
export const phoneRegExp =
  /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
export const passwordRegex = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/

export const passwordMinLength = 6
export const passwordMaxLength = 20

const firstNameMinLength = 3
const firstNameMaxLength = 15

const lastNameMinLength = 3
const lastNameMaxLength = 15
