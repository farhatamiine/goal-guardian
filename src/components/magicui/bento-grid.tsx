import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ReactNode} from "react";
import {ArrowRightIcon} from "lucide-react";
import {User} from "firebase/auth";

import DOMPurify from "dompurify";



const BentoGrid = ({
                       children,
                       className,
                   }: {
    children: ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
                className,
            )}
        >
            {children}
        </div>
    );
};


const BentoCard = ({
                       id,
                       title,
                       content,
                       user_id,
                       className
                   }: {
    id: string,
    user_id: User,
    content: string
    title: string;
    className: string
}) => {


    return (
        <div
            key={id}
            className={cn(
                "group relative flex h-52 w-80 flex-col justify-between overflow-hidden rounded-xl",
                // light styles
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                // dark styles
                "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
                className
            )}
        >
            <div
                className="pointer-events-none
                 z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
                <h3 className="text-lg font-semibold text-neutral-700 dark:text-neutral-300">
                    {title}
                </h3>
                <p className="max-w-lg text-neutral-500 mt-2.5" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
            </div>

            <div
                className={cn(
                    "pointer-events-none bg-yellow-500 z-50 absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
                )}
            >
                <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                    <a href={"/journal/"+id}>
                        <ArrowRightIcon className="ml-2 h-4 w-4"/>
                    </a>
                </Button>
            </div>
            <div
                className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"/>
        </div>
    );
}
export {BentoCard, BentoGrid};
