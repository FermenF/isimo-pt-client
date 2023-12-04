import { PostImage } from "@interfaces/post.interface";
import React from "react";

interface PostImagesProps {
   
    images?: PostImage[];
}

const PostImages: React.FC<PostImagesProps> = ({ images }) => {

    if (images) {
        const lastImages = images.slice(0, 5);
        const quantity = images.length - lastImages.length;
        return (
            <div className=''>
                {
                    images.length === 1 ? (
                        <OneImage image={images[0].path+'/'+images[0].url} />
                    ) : images.length === 2 ? (
                        <TwoImage image={images.slice(0, 2)} />
                    ) : images.length === 3 ? (
                        <ThreeImage image={images.slice(0, 4)} />
                    ) : images.length === 4 ? (
                        <FourImage image={images.slice(0, 5)} />
                    ) : images.length >= 5 && (
                        <FiveImage image={images.slice(0, 5)} quantity={quantity} />
                    )
                }
            </div>
        );
    }
};

interface Image extends PostImagesProps {
    image: string | PostImage[];
    quantity?: number;
}

const OneImage: React.FC<Image> = ({ image }) => {
    if (typeof image === "string") {
        return <img src={pathImage(image)} className='object-cover h-[38rem] w-full' />
    }
};

const TwoImage: React.FC<Image> = ({ image }) => {
    if (typeof image === "object") {
        const style = "object-cover h-[38rem]";
        return (
            <div className="flex">
                <img src={pathImage(image[0].path+'/'+image[0].url)} className={`${style} w-1/2 mr-0.5`} />
                <img src={pathImage(image[1].path+'/'+image[1].url)} className={`${style} w-1/2 ml-0.5`} />
            </div>
        );
    }
};

const ThreeImage: React.FC<Image> = ({ image }) => {
    if (typeof image === "object") {
        const style = "object-cover h-[16rem]";
        return (
            <div>
                <img src={pathImage(image[0].path+'/'+image[0].url)} className={`${style} w-full`} />
                <div className="flex mt-1">
                    <img src={pathImage(image[1].path+'/'+image[1].url)} className={`${style} w-1/2 mr-0.5`} />
                    <img src={pathImage(image[2].path+'/'+image[2].url)} className={`${style} w-1/2 ml-0.5`} />
                </div>
            </div>
        );
    }
};

const FourImage: React.FC<Image> = ({ image }) => {
    if (typeof image === "object") {
        const style = "object-cover h-[16rem]";
        return (
            <div>
                <div className="flex">
                    <img src={pathImage(image[0].path+'/'+image[0].url)} className={`${style} w-1/2 mr-0.5`} />
                    <img src={pathImage(image[1].path+'/'+image[1].url)} className={`${style} w-1/2 ml-0.5`} />
                </div>
                <div className="flex mt-1">
                    <img src={pathImage(image[2].path+'/'+image[2].url)} className={`${style} w-1/2 mr-0.5`} />
                    <img src={pathImage(image[3].path+'/'+image[3].url)} className={`${style} w-1/2 ml-0.5`} />
                </div>
            </div>
        );
    }
};

const FiveImage: React.FC<Image> = ({ image, quantity }) => {
    if (typeof image === "object") {
        const style = "object-cover h-[16rem]";
        return (
            <div>
                <div className="flex">
                    <img src={pathImage(image[0].path+'/'+image[0].url)} className={`${style} w-1/2 mr-0.5`} />
                    <img src={pathImage(image[1].path+'/'+image[1].url)} className={`${style} w-1/2 ml-0.5`} />
                </div>
                <div className="flex mt-1">
                    <img src={pathImage(image[2].path+'/'+image[2].url)} className={`${style} w-1/3 mr-0.5`} />
                    <img src={pathImage(image[3].path+'/'+image[3].url)} className={`${style} w-1/3 mx-0.5`} />
                    <div className='w-1/3 ml-0.5'>
                        <div className='relative'>
                            <img src={pathImage(image[4].path+'/'+image[4].url)} className={`${style}`} />
                            <div className='absolute top-1/3 left-1/3  font-bold text-3xl text-white shadow-md'>
                                {
                                    quantity !== 0 && (
                                        <span>+ {quantity}</span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

function pathImage(fileName: string): string {
    return `http://localhost:8000/storage/${fileName}`;
}
export default PostImages;