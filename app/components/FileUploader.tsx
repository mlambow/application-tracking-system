import { on } from 'events';
import { o } from 'node_modules/react-router/dist/development/components-DzqPLVI1.mjs';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0] || null
        onFileSelect?.(file)
    }, [onFileSelect])
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        accept: {'application/pdf': ['.pdf']},
        maxSize: 10 * 1024 * 1024, // 10MB
        multiple: false,
    })
    
    const file = acceptedFiles[0] || null

  return (
    <div className="w-full gradient-border">
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className='space-y-4 cursor-pointer'>
                <div className='mx-auto w-16 h-16 items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-20 mx-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </div>
                {file ? (
                    <div>

                    </div>
                ) : (
                    <div>
                        <p className='text-lg text-gray-500'>
                            <span className='font-semibold'>
                                Click to upload
                            </span> or drag and drop your file here
                        </p>
                        <p className='text-lg text-gray-500'>
                            PDF (max 10MB)
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default FileUploader