import { Listing, Reservation, User } from "@prisma/client"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
import { IconType } from "react-icons"
import { Range, RangeKeyDict } from "react-date-range"
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

type SafeListing = Omit<
Listing,
"createdAt"> & {
    createdAt: string,
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
    listing: SafeListing ,
    reservation?: SafeReservation,
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


type SingleListingProps = {
    listing: SafeListing & {
        user: SafeUser
    },
    currentUser?: SafeUser | null,
    reservations?: SafeReservation[]
}

type ListingHeadProps = {
    title: string,
    imageSrc: string,
    id: string,
    locationValue: string,
    currentUser?: SafeUser | null
}

type ListingInfoProps = {
    user: SafeUser ,
    category: {
        icon: IconType,
        label: string,
        description: string
    } | undefined,
    desc: string,
    roomCount: number,
    guestCount: number,
    bathroomCount: number,
    locationValue: string
}

type ListingCategoryProps = {
    icon: IconType,
    label: string,
    desc: string
}

type ListingReservationProps = {
    price: number,
    disabled: boolean,
    dateRange: Range,
    totalPrice: number,
    onChangeDate: (value: Range) => void,
    onSubmit: () => void,
    disabledDates: Date[]
}
type CalendarProps = {
    value: Range,
    onChange: (value: RangeKeyDict) => void,
    disabledDates?: Date[]
}

type SafeReservation = Omit<
Reservation,
"createdAt" |"startDate" | "endDate"
> & {
    createdAt: string,
    startDate: string,
    endDate: string,
    listing: SafeListing
}


type TripsClientProps = {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null
}

type ReservationClientProps = {
    reservations: SafeReservation[],
    currentUser?: SafeUser | null
}
type PropertiesClientProps = {
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

type FavoriteClientProps = {
    listings: SafeListing[],
    currentUser?: SafeUser | null
}

type IListingParams = {
    userId?: string
}