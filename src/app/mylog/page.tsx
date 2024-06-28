"use client"

import {onAuthStateChanged} from "firebase/auth";
import {useCallback, useState} from "react";
import {auth} from "@/lib/firebase/config";
import {useRouter} from "next/navigation";

export default function MyLogPage() {

    const router = useRouter()
    //const [user, setUser] = useState<User>();

   /*  const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({email: user.email, uid: user.uid});

            } else {
                return router.push("/");
            }
        });
    }, [router]); */

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h2>Hello to GoalGuardian</h2>
        </main>
    );
}
