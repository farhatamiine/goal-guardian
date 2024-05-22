import Link from 'next/link';
import {Button} from "@/components/ui/button";
// Make sure to import your Button component

const JournalPage = () => {
    const hasJournalEntries = false; // Replace this with your actual logic to check for journal entries

    return (
        <main>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Journal</h1>
            </div>
            {hasJournalEntries ? (
                <div>Your journal entries will be listed here.</div>
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
