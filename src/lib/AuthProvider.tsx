import {createContext, ReactNode, useEffect, useState} from 'react';
import {onAuthStateChanged, signOut, User} from 'firebase/auth';
import {auth} from "@/lib/firebase/config";


interface AuthContextValue {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    loading: true,
    logout: async () => {
    },
});

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const value: AuthContextValue = {user, loading, logout};

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};