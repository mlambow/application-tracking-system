import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '~/lib/utils';

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
                {file ? (
                    <div className={`${file ? 'cursor-default flex items-center justify-between p-3 bg-gray-50 rounded-2xl' :'uploader-selected-file'}`} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                        <img src='/images/pdf.png' alt='pdf file' className='size-10'/>
                        <div className='flex items-center space-x-3'>
                            <div>
                                <p className='text-sm font-medium text-gray-700 truncate max-w-[200px]'>
                                    {file.name}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {formatSize(file.size)}
                                </p>
                            </div>
                        </div>
                        <button>
                            <img src='/icons/cross.svg' alt='remove' className='w-5 h-5 mr-3 cursor-pointer' onClick={(e) => {
                                e.stopPropagation();
                                // Clear the file selection
                                onFileSelect?.(null);
                            }}/>
                        </button>
                    </div>
                ) : (
                    <div className='flex flex-col items-center justify-center p-6 text-center space-y-2'>
                        <div className='mx-auto w-16 h-16 items-center justify-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                            </svg>
                        </div>
                        <p className='text-lg text-gray-500'>
                            Click to upload or drag and drop your file here  
                            <span className='text-sm text-gray-800 font-semibold'> PDF (max 10MB)</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default FileUploader