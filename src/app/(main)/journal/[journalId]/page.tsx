"use client"

import {deleteJournal, getJournalEntry} from '@/lib/utils';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/lib/AuthProvider";
import {User} from "firebase/auth";
import DOMPurify from "dompurify";
import moment from "moment";
import {Timestamp} from "@firebase/firestore";
import {Calendar, Pen, Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const JournalPage = ({params}: { params: { journalId: string } }) => {

    const {user} = useContext(AuthContext)
    const [journalEntry, setJournalEntry] = useState<{
        id: string,
        user_id: User | null,
        content: string,
        title: string,
        created_at: Timestamp
    }>({
        id: "",
        user_id: null,
        content: "",
        title: "",
        created_at: new Timestamp(10, 10)
    });


    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {

        const fetchJournalEntry = async () => {
            try {
                const entries: any = await getJournalEntry(user!!.uid, params.journalId);
                setJournalEntry(entries);
            } catch (error) {
                console.error('Error fetching journal entries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournalEntry();
    }, [params.journalId, user]);

    return (
        <main className={"mb-5"}>
            <section className={"header text-justify mx-auto w-8/12"}>
                <div className={"flex items-center justify-between"}>
                    <h1 className={"text-lg font-bold"}>
                        {journalEntry?.title}
                    </h1>
                    <div className={"space-x-2"}>
                        <Button variant={"outline"} onClick={() => {
                            router.push("/journal/" + journalEntry.id + "/edit")
                        }}>
                            <Pen className={"w-4 h-4"}/>
                        </Button>
                        <Button variant={"destructive_outline"} onClick={async () => {
                            await deleteJournal(journalEntry.id)
                            router.push('/journal')
                        }}>
                            <Trash className={"w-4 h-4"}/>
                        </Button>
                    </div>
                </div>
                <div className={"border-t mt-5 py-3 "}>
                    <h1 className={"flex items-center text-neutral-500 font-medium text-sm"}>
                        <Calendar
                            className={"mr-2 w-4 h-4"}/>{moment(journalEntry.created_at.toDate().toISOString()).format("MMMM Do YYYY")}
                    </h1>
                </div>
                <section>
                    {
                        <p className="max-w-lg text-neutral-500 mt-2.5"
                           dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(journalEntry.content)}}/>
                    }
                </section>
            </section>

        </main>
    );
};

export default JournalPage;
