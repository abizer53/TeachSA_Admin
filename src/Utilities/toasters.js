import { toast } from 'sonner';

export const defaultMessage = (message, id=Math.random()) => {
    toast(`${message}`, {
        id: `Success-toaster-${id}`,
        action: {
            label: "X",
        },
    })
}
export const successMessage = (message, id=Math.random()) => {
    toast.success(`${message}`, {
        id: `Success-toaster-${id}`,
        action: {
            label: "X",
        },
    })
}
export const errorMessage = (message, id=Math.random()) => {
    toast.error(`${message}`, {
        id: `Success-toaster-${id}`,
        action: {
            label: "X",
        },
    })
}
export const infoMessage = (message, id=Math.random()) => {
    toast.info(`${message}`, {
        id: `Success-toaster-${id}`,
        action: {
            label: "X",
        },
    })
}
export const warningMessage = (message, id=Math.random()) => {
    toast.warning(`${message}`, {
        id: `Success-toaster-${id}`,
        action: {
            label: "X",
        },
    })
}
export const descriptionMessage = (message, description) => {
    toast.message(message, {
        description: description,
        action: {
            label: "X",
        },
    })
}