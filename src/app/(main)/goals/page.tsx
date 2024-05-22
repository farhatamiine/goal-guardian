import Link from 'next/link';
import {Button} from "@/components/ui/button";
 // Make sure to import your Button component

const GoalsPage = () => {
    const hasGoals = false; // Replace this with your actual logic to check for goals

    return (
        <main>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Goals</h1>
            </div>
            {hasGoals ? (
                // Replace this with your goals listing component
                <div>Your goals will be listed here.</div>
            ) : (
                <div
                    className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-5"
                >
                    <div className="flex flex-col items-center gap-1 text-center p-4 ">
                        <h3 className="text-2xl font-bold tracking-tight">
                            You have no goals set
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Set a new goal to start tracking your progress and stay motivated.
                        </p>
                        <div className="mt-4 flex gap-4">
                            <Link href="/goals/new">
                                <Button className="mt-4">Add Goal</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default GoalsPage;
