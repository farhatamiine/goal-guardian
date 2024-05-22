"use client"

import React, {useState} from 'react';
import Tiptap from "@/components/TipTapEditor";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import TipTapEditor from "@/components/TipTapEditor";

function NewJournalPage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {

    };

    const handleContentChange = (newContent:string) => {
        setContent(newContent);
    };
    return (
        <div>
            <div className="flex items-center mb-5">
                <h1 className="text-lg font-semibold md:text-2xl">Add new Journal</h1>
            </div>
            <form >
                <div className="mb-4">
                    <TipTapEditor content={content} handleContentChange={handleContentChange} />
                </div>
                <div className="flex justify-end">
                    {/*<Button type="submit" disabled={loading}>*/}
                    {/*    {loading ? 'Saving...' : 'Save Journal Entry'}*/}
                    {/*</Button>*/}
                </div>
            </form>
        </div>
    );
}

export default NewJournalPage;