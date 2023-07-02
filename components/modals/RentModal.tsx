"use client"

import { useRentModal } from "@/hooks/useRentModal"
import { Modal } from "./Modal"
import { useMemo, useState } from "react"
import Heading from "../Heading"
import { categories } from "@/constants"
import CategoryInput from "../inputs/CategoryInput"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import CountrySelect from "../inputs/CountrySelect"
import dynamic from "next/dynamic"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

 enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESC = 4,
  PRICE = 5
}
export const RentModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
    const rentModal = useRentModal()
    const [step, setStep] = useState(STEPS.CATEGORY)
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: {
        errors
      },
      reset
    } = useForm<FieldValues>({
     defaultValues:  {category: "",
     location: null,
     guestCount: 1,
     roomCount: 1,
     bathroomCount: 1,
     imageSrc: "",
     price: 1,
     title: "",
     desc: ""
   }})

   const category = watch("category")
   const location = watch("location")
   const guestCount = watch("guestCount")
   const roomCount = watch("roomCount")
   const bathroomCount = watch("bathroomCount")
   const imageSrc = watch("imageSrc")
   const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

   const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
   }
    const onBack = () => {
      setStep(prev => prev - 1)
    }
    const onNext = () => {
      setStep(prev => prev + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if( step !== STEPS.PRICE) return onNext()

      setIsLoading(true)

      axios.post("/api/listings", data).then(() => {
        toast.success("Listing created!")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      }).catch((err) => {
        toast.error("Something went wrong")
      }).finally(() => {
        setIsLoading(false)
      })
    }
    const actionLabel = useMemo(() => {
      if(step === STEPS.PRICE){
        return 'Create'
      }
      return 'Next'
    },[step])
    const secondaryActionLabel = useMemo(() => {
      if(step === STEPS.CATEGORY){
        return undefined
      }
      return 'Back'
    },[step])
    let bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Which of these best describes your place"
        subtitle="Pick a category"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh]
        overflow-y-auto">
          {categories.map(cat => (
            <div key={cat.label} className="col-span-1">
              <CategoryInput onClick={(cat) => {
                setCustomValue('category', cat)
              }}
              icon={cat.icon}
              label={cat.label}
              selected={category === cat.label}
              /> 
            </div>
          ))}
        </div>
      </div>
    )
    if(step === STEPS.LOCATION){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Where is your place located ?"
          subtitle="Help guests find you!"/>
          <CountrySelect value={location}
          onChange={(value) => setCustomValue('location', value)}/>
          <Map center={location?.latlng}/>
        </div>
      )
    }

    if(step === STEPS.INFO) {
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Share some basics about your place"
          subtitle="What amenities do you have ?"/>
          <Counter onChange={(value) => setCustomValue('guestCount', value)} value={guestCount} title="Guests"
          subtitle="How many guests do you allow?"/>
          <hr />
          <Counter onChange={(value) => setCustomValue('roomCount', value)} value={roomCount} title="Rooms"
          subtitle="How many rooms do you have?"/>
          <hr />
          <Counter onChange={(value) => setCustomValue('bathroomCount', value)} value={bathroomCount} title="Bathrooms"
          subtitle="How many bathrooms do you have?"/>
          <hr />
          </div>
      )
    }

    if(step === STEPS.IMAGES){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Add a photo"
          subtitle="Show guests your place"/>
          <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)}/>
        </div>
      )
    }
    if(step === STEPS.DESC){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="How would you describe your place"
          subtitle="Short and sweet works best!"/>
          <Input id="title" label="Title" disabled={isLoading}
          register={register} errors={errors} required/>
          <hr />
          <Input id="desc" label="Description" disabled={isLoading}
          register={register} errors={errors} required/>
        </div>
      )
    }
    if(step === STEPS.PRICE){
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Now set your price?"
          subtitle="How much do you charge per night"/>
          <Input id="price" label="Price"
          register={register} errors={errors}
          disabled={isLoading}
          required formatPrice type="number"/>
        </div>
      )
    }
  return (
    <Modal title="Airbnb your home!"
    isOpen={rentModal.isOpen}
    onClose={rentModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    body={bodyContent}
    />

  )
}

