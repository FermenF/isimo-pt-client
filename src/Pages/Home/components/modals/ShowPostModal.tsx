import { apiAssets } from "@config/api";
import { PostImage } from "@interfaces/post.interface";
import React from "react";

interface ShowPostModalProps {
    images: PostImage[];
    openPostModal: boolean;
    handleShowOpenModal: () => void;
}

const ShowPostModal: React.FC<ShowPostModalProps> = ({ images, openPostModal, handleShowOpenModal }) => {
    console.log(images);
    return (
        <div className={`${openPostModal ? 'fixed' : 'hidden'} w-[98%] md:w-3/4 lg:w-2/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-200 rounded-md`}>
            <div className="text-right p-2">
                <button className="bg-black rounded-full p-2" onClick={handleShowOpenModal}>
                    <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
            <div className="p-5 overflow-y-scroll h-[700px]">
                {
                    images.map((image, i) => (
                        <div className="mb-5" key={ i }>
                            <img src={ pathImage(image.path+'/'+image.url) } className="w-full object-contain rounded-md" />
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default ShowPostModal;

function pathImage(fileName: string): string {
    return `${ apiAssets }/${fileName}`;
}