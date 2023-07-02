"use client"
import { useCountries } from '@/hooks/useCountries'
import { ListingHeadProps } from '@/types/types'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

const ListingHead = ({
    id,
    imageSrc,
    currentUser,
    locationValue,
    title
}: ListingHeadProps) => {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)
  return (
    <>
    <Heading title={title} subtitle={`${location?.region}, ${location?.label}`}/>
    <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
        <Image src={imageSrc} alt='listing-image' fill className='object-cover w-full '/>
        <div className='absolute top-5 right-5'>
            <HeartButton listingId={id} currentUser={currentUser}/>
        </div>
    </div>
    </>
  )
}

export default ListingHead