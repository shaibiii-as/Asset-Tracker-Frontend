export interface UserInterface {
    image: any
    firstName: string
    lastName: string
    title: string
    phone: string
    email: string
    timeZone: string
    dateFormat: string
    timeFormat: string
}

export const userInitialValue: UserInterface = {
    image: '',
    firstName: '',
    lastName: '',
    title: ' ',
    phone: '',
    email: "",
    timeZone: '',
    dateFormat: "",
    timeFormat: ""
}