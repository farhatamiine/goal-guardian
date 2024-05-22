"use client"

import React, {useContext, useState} from 'react';
import TipTapEditor from "@/components/TipTapEditor";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form"

import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {Input} from "@/components/ui/input";
import {addJournal, errorMessage, successMessage} from "@/lib/utils";
import {AuthContext} from "@/lib/AuthProvider";

const editorFormSchema = z.object({
    title: z.string().min(2, {
        message: "title must be at least 2 characters.",
    }),

})

function NewJournalPage() {
    const {user} = useContext(AuthContext);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(data: z.infer<typeof editorFormSchema>) {
        setLoading(true);
        if (!user) {
            errorMessage('You must be logged in to add a journal entry.');
            setLoading(false);
            return;
        }
        try {
            await addJournal(data.title, content, user);
            successMessage('Journal entry added successfully');
            router.push('/journal');
        } catch (error) {
            console.error('Error adding journal entry:', error);
            errorMessage('Error adding journal entry');
        }
        setLoading(false);

    }

    const form = useForm<z.infer<typeof editorFormSchema>>({
        resolver: zodResolver(editorFormSchema),
        defaultValues: {
            title: "",
        },
    })

    const handleContentChange = (newContent: string) => {
        setContent(newContent);
    };
    return (
        <div>
            <div className="flex items-center mb-3">
                <h1 className="text-lg font-semibold md:text-2xl">Add new Journal</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
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
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="mb-4">
                        <TipTapEditor content={content} handleContentChange={handleContentChange}/>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Journal Entry'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default NewJournalPage;