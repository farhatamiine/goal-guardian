import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, User} from "firebase/auth";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import db, {auth} from "@/lib/firebase/config";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where
} from "@firebase/firestore";


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const successMessage = (message: string) => {
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


export function getBorderColor(mood:string) {
    console.log(mood)
    switch (mood.toLowerCase()) {
        case "excited":
            return "border-yellow-500";
        case "happy":
            return "border-green-500";
        case "neutral":
            return "border-gray-500";
        case "sad":
            return "border-blue-500";
        case "angry":
            return "border-red-500";
        default:
            return "border-gray-500"; // Default border color
    }
}
export const errorMessage = (message: string) => {
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
            router.push("/dashboard");
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
            router.push("/dashboard");
        })
        .catch((error) => {
            console.error(error);
            errorMessage("Incorrect Email/Password ❌");
        });
};


export const addJournal = async (title: string, content: string,mood:string, user: User) => {
    await addDoc(collection(db, "journal_entries"), {
        user_id: user.uid,
        title,
        content,
        mood,
        created_at: new Date(),
    })
}

export const editJournal = async (journalId: string, title: string, content: string, mood: string, user: User) => {
    try {
        const journalDocRef = doc(db, "journal_entries", journalId);
        await updateDoc(journalDocRef, {
            title,
            content,
            mood,
            updated_at: new Date(),  // Optionally track when the document was updated
        });
    } catch (error) {
        console.error("Error updating journal entry: ", error);
        throw new Error("Error updating journal entry");
    }
};


export const deleteJournal = async (journalId: string) => {
    try {
        const journalDocRef = doc(db, "journal_entries", journalId);
        await deleteDoc(journalDocRef);
    } catch (error) {
        console.error("Error deleting journal entry: ", error);
        throw new Error("Error deleting journal entry");
    }
};

export const getJournalEntries = async (user: User) => {
    try {
        const q = query(collection(db, 'journal_entries'), where('user_id', '==', user.uid));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (err) {
        console.error('Error getting journal entries:', err);
        return [];
    }
}

export const getJournalEntry = async (userId: string, docId: string) => {

    try {
        // Create a reference to the specific document
        const docRef = doc(db, 'journal_entries', docId);
        // Get the document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Document data exists
            const data = docSnap.data();
            // Convert Firestore Timestamp to JavaScript Date
            if (data.created_at instanceof Timestamp) {
                data.created_at = data.created_at.toDate();
            }
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            // Document does not exist
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        return null;
    }
};