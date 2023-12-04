import React, { useState } from 'react';
import ImageRender from './ImageRender';

interface ImagesProps {
    images: string[];
    onUpdate: (newImages: string[]) => void;
}

const Images: React.FC<ImagesProps> = ({ images, onUpdate }) => {
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files) {
            try {
                const newImages = await Promise.all(
                    Array.from(files).map(async (file) => {
                        const imageUrl = await uploadImageToServer(file);
                        return imageUrl;
                    })
                );
                onUpdate([...images, ...newImages]);
                setPreviewImages((prevImages) => [...prevImages, ...newImages]);
            } catch (error) {
                throw new Error('Error al cargar la imagen:');
            }
        }
    };

    const uploadImageToServer = async (file: File): Promise<string> => {
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
    };

    return (
        <div className='h-64 w-full'>
            {
                previewImages.length === 0 && (
                    <div className="flex items-center justify-center">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <div className='text-gray-500'>
                                    <svg className="w-8 h-8" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                </div>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                            />
                        </label>
                    </div>
                )
            }
            <div className="p-2 border border-gray-200 rounded-2xl">
                {
                    previewImages.length > 0 && (
                        <div className='relative'>
                            <div className="absolute top-2 left-2 flex">
                                <div className='bg-white text-sm font-semibold rounded-md p-2 shadow-md shadow-gray-500 cursor-pointer'>
                                    <label htmlFor='upload-more-images' className='cursor-pointer'>
                                        Upload More
                                    </label>
                                    <input type='file' id='upload-more-images' className="hidden cursor-pointer" onChange={handleFileChange} accept="image/*" />
                                </div>
                                <button className='bg-white text-sm font-semibold rounded-md p-2 shadow-md shadow-gray-500 cursor-pointer ml-1'>
                                    Edit All
                                </button>
                            </div>
                            <ImageRender images={previewImages} />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Images;
