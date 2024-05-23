"use client"

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {User} from "firebase/auth";
import DOMPurify from "dompurify";
import {Timestamp} from "@firebase/firestore";
import moment from "moment";
import {cn} from "@/lib/utils";

function JournalCard({
                         id,
                         title,
                         content,
                         mood,
                         created_at,
                         user_id,
                         className
                     }: {
    id: string,
    user_id: User,
    content: string,
    mood: string,
    title: string;
    created_at: Timestamp,
    className: string
}) {

    const getColorByMood = (mood: string) => {
        const moodLowerCase = mood.toLowerCase();
        switch (moodLowerCase) {
            case "excited":
                return 'border-yellow-500';
            case "happy":
                return 'border-green-500';
            case "neutral":
                return 'border-gray-500';
            case "sad":
                return 'border-blue-500';
            case "angry":
                return 'border-red-500';
            default:
                return 'border-gray-500';
        }
    };



    return (
        <Card
            key={id}
            className={cn(
                `cursor-pointer ease-in-out hover:${getColorByMood(mood)}  border-b-2`,
                className
            )}
        >
            <CardHeader>
                <CardTitle className={"text-md"}>{title}</CardTitle>
                <CardDescription>
                    {moment(created_at.toDate().toISOString()).format("MMMM Do YYYY")}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-6">
                    <p className={`max-w-lg text-${getColorByMood(mood)}-500 mt-2.5`}
                       dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}/>
                </div>
            </CardContent>
        </Card>
    );
}

export default JournalCard;