import { toast } from 'sonner';

export const defaultMessage = (message, id=Math.random()) => {
    toast(`${message}`, {
        id: `Success-toaster-${id}`
    })
}
export const successMessage = (message, id=Math.random()) => {
    toast.success(`${message}`, {
        id: `Success-toaster-${id}`
    })
}
export const errorMessage = (message, id=Math.random()) => {
    toast.error(`${message}`, {
        id: `Success-toaster-${id}`
    })
}
export const infoMessage = (message, id=Math.random()) => {
    toast.info(`${message}`, {
        id: `Success-toaster-${id}`
    })
}
export const warningMessage = (message, id=Math.random()) => {
    toast.warning(`${message}`, {
        id: `Success-toaster-${id}`
    })
}
export const descriptionMessage = (message, description) => {
    toast.message(message, {
        description: description,
    })
}