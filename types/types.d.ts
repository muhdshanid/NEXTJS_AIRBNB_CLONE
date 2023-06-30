import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { IconType } from "react-icons"

type ContainerProps = {

    children: React.ReactNode
}
type ClientOnlyProps = {

    children: React.ReactNode
}

type MenuItemProps = {
    onClick: () => void,
    label: string
}

type InputProps = {
    id: string,
    label: string,
    type?: string,
    disabled?: boolean,
    formatPrice?: boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors
}

type HeadingProps = {
    title: string,
    subtitle?: string,
    center?: boolean
}

type ModalProps = {
    isOpen?: boolean,
    onClose: () => void
    onSubmit: () => void,
    title?: string
    body?: React.ReactElement,
    footer?: React.ReactElement,
    actionLabel: string,
    disabled?: boolean,
    secondaryAction?: () => void
    secondaryActionLabel?: string
}

type ButtonProps = {
    label: string,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    icon?: IconType
}

type RegisterModalStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}

