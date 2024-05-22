"use client"
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider} from "@/lib/AuthProvider";


const inter = Inter({subsets: ["latin"]});


export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ToastContainer/>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
