"use client"

import {signIn} from 'next-auth/react'
import { useCallback, useState } from "react"
import { AiFillGithub } from "react-icons/ai"
import {FcGoogle} from 'react-icons/fc'
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { Modal } from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import { toast } from "react-hot-toast"
import Button from "../Button"
import { userLoginModal } from "@/hooks/useLoginModal"
import { useRegisterModal } from "@/hooks/useRegisterModal"
import { useRouter } from 'next/navigation'

export const LoginModal = () => {
    
    const registerModal = useRegisterModal()
    const loginModal = userLoginModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {register, handleSubmit, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues:{
            email: "",
            password: "",
        }
    })

    const toggleModal = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(false)
            if(callback?.ok){
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose()
            }

            if(callback?.error){
                toast.error(callback.error)
            }
        }).catch(err => console.log(err)
         )
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
           <Heading title={"Welcome back"}
           subtitle={"Login to your account"}/>
           
           <Input 
           id="email"
           label="Email"
           type="email"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
           <Input 
           id="password"
           type="password"
           label="Password"
           disabled={isLoading}
           register={register}
           errors={errors}
           required
           />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}/>
            <Button outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}/>
            <div className="text-neutral-500 text-center mt- font-light">
                <div className="justify-center flex items-center gap-2">
                    <div>
                        first time using Airbnb ? 
                    </div>
                    <div onClick={toggleModal} className="text-neutral-800 cursor-pointer hover:underline">
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )
  return (
    <Modal disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    body={bodyContent}
    actionLabel="Continue"
    onClose={loginModal.onClose}
    footer={footerContent}
    onSubmit={handleSubmit(onSubmit)}/>
  )
}
