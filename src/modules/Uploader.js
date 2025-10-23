import { infoMessage } from '@/Utilities/toasters';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Delete from '../../public/icons/Delete';

export default function Uploader({ title, handler, existingUrl = null, existingFile = null, files = false, ...attributes }) {
    const ref = useRef(null);
    const [url, setUrl] = useState(existingUrl || null);
    const [file, setFile] = useState(existingFile || null);
    const [isImage, setIsImage] = useState(false);

    const clickHandler = () => {
        if (ref.current) {
            ref.current.click(); // Programmatically trigger the file input dialog
        }
    };

    const deleteHandler = () => {
        setUrl(null);
        setFile(null);
        setIsImage(false);
        handler && handler(null); // Reset the handler
    };

    const uploadFileHandler = (selectedFile) => {
        if (!selectedFile) return;
        handler && handler(selectedFile);

        // Set as image
        setIsImage('image');
        setUrl(URL.createObjectURL(selectedFile)); // Set URL for image preview
        setFile(selectedFile);
    };

    const validateFile = (selectedFile) => {
        const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];

        // Check if the file type is allowed
        if (!allowedImageTypes.includes(selectedFile.type)) {
            infoMessage("Invalid file type! Please upload an image (JPG, PNG, WEBP, AVIF).");
            return false;
        }

        // Check file size (1MB for images)
        const maxSize = 5242880; // 5MB
        if (selectedFile.size > maxSize) {
            const fileSizeMB = selectedFile.size / (1024 * 1024);
            infoMessage(`Max file size 5MB. Uploaded file size: ${fileSizeMB.toFixed(2)} MB`);
            return false;
        }

        return true;
    };

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            if (validateFile(selectedFile)) {
                uploadFileHandler(selectedFile);
            }
        } else {
            infoMessage("Invalid file type! Please upload an image (JPG, PNG, WEBP, AVIF).");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'image/jpeg': ['.jpeg', '.jpg'],
            'image/png': ['.png'],
            'image/webp': ['.webp'],
            'image/avif': ['.avif']
        }
    });

    useEffect(() => {
        if (existingUrl || existingFile) {
            setUrl(existingUrl || existingFile)
            setIsImage('image'); // Set as image
        }
    }, [existingUrl, existingFile]);

    return (
        <>
            {files && file && (
                <div className="group relative w-full h-auto py-5 rounded-md flex flex-wrap items-center justify-start">
                    <div className="w-auto border border-dashed bg-purple-100 p-3 rounded-md truncate break-words">
                        {file.name}
                    </div>
                </div>
            )}
            {!url && (
                <div {...getRootProps()}
                    className={`w-full border border-dashed border-primary rounded-md bg-primary3 p-6 flex flex-wrap items-center justify-center cursor-pointer uploader ${isDragActive ? 'bg-gray-200' : ''}`}
                >
                    <input {...getInputProps()} />
                    <h3 className="font-poppins text-base w-full text-black-3 text-center mt-2">
                        {title}
                        <span className="text-primary">*</span>
                    </h3>
                    <h3 className="font-poppins text-sm w-full text-center text-[#B1B1B1] mt-0.5">
                        ( Drag & Drop or Click to Upload - Acceptable formats: JPEG, PNG, WEBP, AVIF )
                    </h3>
                </div>
            )}

            {!files && (url || existingUrl || existingFile) && (
                <div className="group relative w-full h-40 border border-dashed border-primary rounded-md bg-primary3 flex flex-wrap items-center justify-center">
                    {isImage === 'image' && (
                        <img src={url || existingUrl || existingFile}
                            alt="Uploaded content" className="w-full h-full object-contain rounded-md " />
                    )}
                    <span onClick={deleteHandler} className="absolute cursor-pointer -bottom-4 -right-2 border rounded-full p-1.5 bg-zinc-100">
                        <Delete />
                    </span>
                </div>
            )}
        </>
    );
}