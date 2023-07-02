"use client"
import { useCountries } from '@/hooks/useCountries'
import { ListingInfoProps } from '@/types/types'
import Avatar from '../Avatar'
import { ListingCategory } from './ListingCategory'
import dynamic from 'next/dynamic'

const ListingInfo = ({
    user,
    desc,
    category,
    roomCount,
    bathroomCount,
    locationValue,
    guestCount
}: ListingInfoProps) => {
    const Map = dynamic(() => import("../Map"), {
        ssr: false
    })
    const {getByValue} = useCountries()
    const coordinates = getByValue(locationValue)?.latlng
  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl flex font-semibold gap-2 items-center'>
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className='flex items-center gap-4 font-light text-neutral-500'>
                <div> {guestCount} guests</div>
                <div> {roomCount} rooms</div>
                <div> {bathroomCount} bathrooms</div>
            </div>
        </div>
        <hr />
        {
            category && (
                <ListingCategory icon={category.icon}
                label={category.label} desc={category.description}/>
            )
        }
        <hr />
        <div className='text-lg font-light text-neutral-500'>
            {desc}
        </div>
        <hr />
        <Map center={coordinates}/>
    </div>
  )
}

export default ListingInfo