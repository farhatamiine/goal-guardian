"use client"

import Link from 'next/link';
import {Button} from "@/components/ui/button";

import {getJournalEntries} from '@/lib/utils';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/lib/AuthProvider";
import {User} from "firebase/auth";
import {BentoCard, BentoGrid} from "@/components/magicui/bento-grid"; // Import the function to retrieve journal entries

const JournalPage = () => {
    const {user} = useContext(AuthContext)
    const [journalEntries, setJournalEntries] = useState<{ id: string, user_id: User, content: string, title: string, created_at: Date }[]>([]);


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
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Journal</h1>
            </div>
            {loading ? (
                <div>Loading...</div>
            ) : journalEntries.length > 0 ? (
                <BentoGrid className="lg:grid-rows-2 mt-2.5">
                    {journalEntries.map((entry, index) => (
                        <BentoCard key={entry.id}
                                   title={entry.title}
                                   id={entry.id}
                                   user_id={entry.user_id}
                                   content={entry.content}
                                   className={`lg:col-start-${index % 3 + 1} lg:col-end-${index % 3 + 2} lg:row-start-${Math.floor(index / 3) * 2 + 1} lg:row-end-${Math.floor(index / 3) * 2 + 3}`}
                        />

                    ))}
                </BentoGrid>
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
                        <div className="mt-4 flex gap-4">
                            <Link href="/journal/new">
                                <Button className="mt-4">Add Journal Entry</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default JournalPage;
