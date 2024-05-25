"use client"

import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
    return (
        <main>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            </div>
            <div
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-3"
                x-chunk="dashboard-02-chunk-1"
            >
                <div className="flex flex-col items-center gap-1 text-center p-4">
                    <h3 className="text-2xl font-bold tracking-tight">
                        You have no journal entries
                    </h3>
                    <p className="text-sm text-muted-foreground my-2">
                        Start by adding a new journal entry or setting a goal to boost your productivity.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/journal/new" className="mt-4">
                            <Button>Add Journal Entry</Button>
                        </Link>
                        <Link href="/goals/new" className="mt-4">
                            <Button>Add Goal</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>

    );
}

export default DashboardPage
