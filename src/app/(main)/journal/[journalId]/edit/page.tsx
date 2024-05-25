"use client"

import {editJournal, errorMessage, getJournalEntry, successMessage} from '@/lib/utils';
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "@/lib/AuthProvider";
import {User} from "firebase/auth";
import {Timestamp} from "@firebase/firestore";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import TipTapEditor from "@/components/TipTapEditor";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


const updateFormSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),
    mood: z.string(),
    content: z.string().min(10, {
        message: "content must be at least 10 characters.",
    }),

})

interface Mood {
    key: number;
    mood: string;
    emoji: string;
}

const JournalPage = ({params}: { params: { journalId: string } }) => {
    const {user} = useContext(AuthContext)

    const [journalEntry, setJournalEntry] = useState<{
        id: string,
        user_id: User | null,
        content: string,
        title: string,
        created_at: Timestamp
        mood: string,
    }>({
        id: "",
        user_id: null,
        content: "",
        title: "",
        mood: "",
        created_at: new Timestamp(10, 10)
    });
    const moods: Mood[] = [
        {key: 1, mood: 'Excited', emoji: '😃'},
        {key: 2, mood: 'Happy', emoji: '😊'},
        {key: 3, mood: 'Neutral', emoji: '😐'},
        {key: 4, mood: 'Sad', emoji: '😢'},
        {key: 5, mood: 'Angry', emoji: '😠'},
    ];

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof updateFormSchema>>({
        resolver: zodResolver(updateFormSchema),
        defaultValues: journalEntry
    })

    useEffect(() => {

        const fetchJournalEntry = async () => {
            try {
                const entries: any = await getJournalEntry(user!!.uid, params.journalId);
                setJournalEntry(entries);
                form.reset(entries);  // Reset form with fetched data

            } catch (error) {
                console.error('Error fetching journal entries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournalEntry();
    }, [form, params.journalId, user]);


    async function onSubmit(data: z.infer<typeof updateFormSchema>) {
        setLoading(true);
        if (!user) {
            errorMessage('You must be logged in to add a journal entry.');
            setLoading(false);
            return;
        }
        try {
            await editJournal(params.journalId, data.title, data.content, data.mood, user);
            successMessage('Journal entry updated successfully');
            router.push('/journal');
        } catch (error) {
            console.error('Error adding journal entry:', error);
            errorMessage('Error adding journal entry');
        }
        setLoading(false);

    }


    return (
        <div>
            <div className="flex items-center mb-3">
                <h1 className="text-lg font-semibold md:text-2xl">Update your Journal</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <div className={"flex items-center justify-between w-full gap-4"}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem className={"flex-grow"}>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="title"
                                            type="text"
                                            placeholder="Journal Title"
                                            required
                                            {...field}
                                        />
                                    </FormControl>

                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="mood"
                            render={({field: {onChange, value}}) => (
                                <FormItem className={"flex-grow"}>
                                    <FormLabel>How`&apos;`s your mood today?</FormLabel>
                                    <FormControl>
                                        <div className={"space-x-3"}>
                                            {
                                                moods.map(({key, emoji, mood}) => {
                                                    return (
                                                        <Button key={key} type={"button"}
                                                                variant={value === mood ? 'default' : 'outline'}
                                                                className={"text-xl"} onClick={() => onChange(mood)}>
                                                            {emoji}
                                                        </Button>
                                                    )
                                                })
                                            }
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="mb-4">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({field: {onChange, value}}) => (
                                <FormItem className={"flex-grow"}>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <TipTapEditor content={value} handleContentChange={onChange}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Journal Entry'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default JournalPage;
