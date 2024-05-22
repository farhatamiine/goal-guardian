'use client'

import {Editor, EditorContent, useEditor} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'

import React, {useEffect} from "react";


import './tipTapEditor.scss';
import {Button} from "@/components/ui/button";
import {AlignJustify, Bold, Heading1, Heading2, Heading3, Italic, Strikethrough, Text} from "lucide-react";


interface TipTapEditorProps {
    content: string;
    handleContentChange: (content: string) => void;
}

const CustomDocument = Document.extend({
    content: 'heading block*',
})
const MenuBar = ({editor}: { editor: Editor | null }) => {
    if (!editor) {
        return null
    }

    return (
        <div className={"space-x-1"}>
            <Button type={"button"} variant={"outline"}
                    onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                    className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}>
                <Heading1 className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"}
                    onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                    className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}>
                <Heading2 className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"}
                    onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                    className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}>
                <Heading3 className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"} onClick={() => editor.chain().focus().setParagraph().run()}
                    className={editor.isActive('paragraph') ? 'is-active' : ''}>
                <Text className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"} onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'is-active' : ''}>
                <Bold className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"} onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'is-active' : ''}>
                <Italic className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"} onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'is-active' : ''}>
                <Strikethrough className={"w-4 h-4"}/>
            </Button>
            <Button type={"button"} variant={"outline"}
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''}>
                <AlignJustify className={"w-4 h-4"}/>
            </Button>
        </div>
    )
}
const TipTapEditor: React.FC<TipTapEditorProps> = ({content, handleContentChange}) => {
    const editor = useEditor({
        extensions: [
            CustomDocument,
            StarterKit.configure({
                document: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        onUpdate({editor}) {
            handleContentChange(editor.getHTML());
        },
    })

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);
    return (
        <div>
            <MenuBar editor={editor}/>
            <EditorContent editor={editor}/>
        </div>
    )
}

export default TipTapEditor