"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { userLoginModal } from "@/hooks/useLoginModal";
import { UserMenuProps } from "@/types/types";
import { signOut } from "next-auth/react";
import { useRentModal } from "@/hooks/useRentModal";

const UserMenu = ({currentUser}: UserMenuProps) => {
  const registerModal = useRegisterModal()
  const loginModal = userLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = () => {
    if(!currentUser){
      return loginModal.onOpen()
    }
    rentModal.onOpen()
  }
  return (
    <div className="relative ">
      <div className="flex items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm py-3 px-4 rounded-full transition
            font-semibold hover:bg-neutral-100  cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={() => {
            toggleOpen();
          }}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200
            flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image}/>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="absolute rounded-xl shadow-md w-[40vw] 
                md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {
              currentUser ? 
              <>
              <MenuItem onClick={() => {}} label="My trips" />
              <MenuItem onClick={() => {}} label="My favorites" />
              <MenuItem onClick={() => {}} label="My reservations" />
              <MenuItem onClick={() => {}} label="My properties" />
              <MenuItem onClick={() => {rentModal.onOpen() 
              setIsOpen(false)}} label="Airbnb my home" />
              <MenuItem onClick={() => signOut()} label="Logout" />
            </>
              :
            <>
              <MenuItem onClick={() => {loginModal.onOpen()
              setIsOpen(false)}} label="Login" />
              <MenuItem onClick={() => {registerModal.onOpen()
              setIsOpen(false)}} label="Sign up" />
            </>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
