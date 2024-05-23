"use client"

import Link from 'next/link';
import {Button} from "@/components/ui/button";

import {getJournalEntries} from '@/lib/utils';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/lib/AuthProvider";
import {User} from "firebase/auth";
import {PlusCircle} from "lucide-react";
import JournalCard from "@/components/JournalCard";
import {Timestamp} from "@firebase/firestore"; // Import the function to retrieve journal entries

const JournalPage = () => {
    const {user} = useContext(AuthContext)
    const [journalEntries, setJournalEntries] = useState<{
        id: string,
        user_id: User,
        mood: string,
        content: string,
        title: string,
        created_at: Timestamp
    }[]>([]);


    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchJournalEntries = async () => {
            try {
                const entries: any = await getJournalEntries(user!!);
                setJournalEntries(entries);
            } catch (error) {
                console.error('Error fetching journal entries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournalEntries();
    }, [user]);
    return (
        <main>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Journal</h1>
                <Link href="/journal/new">
                    <Button className="mt-4" variant={"link"}>
                        <PlusCircle className={"w-4 h-4 mr-3"}/>
                        Add Journal Entry
                    </Button>
                </Link>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : journalEntries.length > 0 ? (
                <div className="grid grid-cols-4 mt-2.5 gap-2">
                    {journalEntries.map((entry, index) => (
                        <JournalCard key={entry.id}
                                     title={entry.title}
                                     created_at={entry.created_at}
                                     id={entry.id}
                                     user_id={entry.user_id}
                                     content={entry.content}
                                     className={`col-span-2`}
                                     mood={entry.mood}/>

                    ))}
                </div>
            ) : (
                <div
                    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-5"
                >
                    <div className="flex flex-col items-center gap-1 text-center p-4 ">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no journal entries
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Start by adding a new journal entry to track your thoughts and progress.
                        </p>
                    </div>
                </div>
            )}
        </main>
    );
};

export default JournalPage;
