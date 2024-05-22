import React, {ReactNode} from 'react';

function AuthLayout({
                        children
                    }: {
    children: ReactNode

}) {
    return (
        <section className={"h-screen flex items-center justify-center w-full"}>
            {children}
        </section>
    );
}

export default AuthLayout;