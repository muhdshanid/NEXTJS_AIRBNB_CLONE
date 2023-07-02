import { Listing, Reservation, User } from "@prisma/client"
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
type LoginModalStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}
type RentModalStore = {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void,
}



type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"> & {
    createdAt: string,
    updatedAt: string,
    emailVerified: string | null,
}

type NavbarProps = {
    currentUser?: SafeUser | null
}

type UserMenuProps = {
    currentUser?: SafeUser | null
}


type AvatarProps = {
    src?: string | null | undefined
}

type CategoryBoxProps = {
    label: string,
    icon: IconType,
    selected?: boolean
    
}

type CategoryInputProps = {
    icon: IconType,
    onClick: (value: string) => void
    label: string,
    selected?: boolean
}

type CountrySelectValue = {
    flag: string,
    label: string,
    latlng: number[],
    region: string,
    value: string
}

type CountrySelectProps = {
    value?: CountrySelectValue,
    onChange: (value: CountrySelectValue) => void
}

type MapProps = {
    center?: number[]
}

type CounterProps = {
    title: string,
    subtitle: string,
    value: number,
    onChange: (value: number) => void
}

type ImageUploadProps = {
    onChange: (value: string) => void,
    value: string
}

type EmptyStateProps = {
    title?: string,
    subtitle?: string,
    showReset?: boolean
}


type ListingCardProps = {
    listing: Listing,
    reservation?: Reservation,
    onAction?: (id: string) => void,
    disabled?: boolean,
    actionLabel?: string,
    actionId?: string,
    currentUser?: SafeUser | null
}


type HeartButtonProps = {
    listingId: string,
    currentUser?: SafeUser | null
}

type UseFavorite = {
    listingId: string,
    currentUser?: SafeUser | null
}
