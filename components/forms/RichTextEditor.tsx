'use client';

import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write something...'
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<any>(null);
  const isUpdatingRef = useRef(false);
  const changeHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      if (!editorRef.current || quillRef.current) {
        return;
      }

      try {
        const QuillModule = await import('quill');
        if (!isMounted || !editorRef.current) {
          return;
        }

        editorRef.current.innerHTML = '';

        const toolbarOptions = [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean']
        ];

        const instance = new QuillModule.default(editorRef.current, {
          theme: 'snow',
          modules: { toolbar: toolbarOptions },
          placeholder
        });

        quillRef.current = instance;

        if (value) {
          instance.root.innerHTML = value;
        }

        const handleChange = () => {
          if (!isUpdatingRef.current) {
            onChange(instance.root.innerHTML);
          }
        };

        changeHandlerRef.current = handleChange;
        instance.on('text-change', handleChange);
      } catch (error) {
        console.error('Failed to initialize Quill editor:', error);
      }
    };

    initialize();

    return () => {
      isMounted = false;
      if (quillRef.current) {
        if (changeHandlerRef.current) {
          quillRef.current.off('text-change', changeHandlerRef.current);
        }
        quillRef.current = null;
      }
    };
  }, [onChange, placeholder]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      isUpdatingRef.current = true;

      const selection = quillRef.current.getSelection();
      quillRef.current.root.innerHTML = value;

      if (selection) {
        setTimeout(() => {
          quillRef.current?.setSelection(selection);
        }, 0);
      }

      isUpdatingRef.current = false;
    }
  }, [value]);

  return (
    <div className="richtext-editor border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <div
        ref={editorRef}
        style={{ minHeight: '200px' }}
      />
    </div>
  );
};

export default RichTextEditor;
