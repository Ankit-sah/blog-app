'use client';

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isUpdatingRef = useRef(false); 

  useEffect(() => {
    const container = editorRef.current;
    if (!container || quillRef.current) {
      return;
    }

    container.innerHTML = '';

    const toolbarOptions = [[
      { header: [1, 2, 3, false] },
      'bold',
      'italic',
      'underline',
      'strike',
      { list: 'ordered' },
      { list: 'bullet' },
      'link',
      'image',
      'clean',
    ]];

    const instance = new Quill(container, {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: placeholder || 'Write something...',
    });

    quillRef.current = instance;

    if (value) {
      instance.root.innerHTML = value;
    }

    instance.on('text-change', () => {
      if (!isUpdatingRef.current) {
        onChange(instance.root.innerHTML);
      }
    });

    return () => {
      instance.off('text-change');
      quillRef.current = null;
      container.innerHTML = '';
    };
  }, [onChange, placeholder]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      isUpdatingRef.current = true;
      quillRef.current.root.innerHTML = value;
      isUpdatingRef.current = false;
    }
  }, [value]);

  return (
    <div className="richtext-editor">
      <div ref={editorRef} />
    </div>
  );
};

export default RichTextEditor;