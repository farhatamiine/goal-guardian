import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {auth} from "@/lib/firebase/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const successMessage = (message:string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};
export const errorMessage = (message:string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};

export const LoginUser = (email: string, password: string, router: AppRouterInstance) => {
  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        successMessage("Authentication successful 🎉");
        router.push("/mylog");
      })
      .catch((error) => {
        console.error(error);
        errorMessage("Incorrect Email/Password ❌");
      });
};

export const RegisterUser = (email: string, password: string, router: AppRouterInstance) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        successMessage("Authentication successful 🎉");
        router.push("/mylog");
      })
      .catch((error) => {
        console.error(error);
        errorMessage("Incorrect Email/Password ❌");
      });
};