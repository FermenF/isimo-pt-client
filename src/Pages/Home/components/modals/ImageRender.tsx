import React from 'react';

interface ImageRenderProps {
    images: string[];
}

const ImageRender: React.FC<ImageRenderProps> = ({ images }) => {

    const lastImages = images.slice(0, 5);
    const quantity = images.length - lastImages.length ;

    return(
        <div>
            {
                lastImages.length === 1 ? (
                    <OneImage image={ lastImages[0] }/>
                ) : lastImages.length === 2 ? (
                    <TwoImage image={ lastImages.slice(0, 2) }/>
                ): lastImages.length === 3 ? (
                    <ThreeImage image={ lastImages.slice(0, 4) }/>
                ): lastImages.length === 4 ? (
                    <FourImage image={ lastImages.slice(0, 5) }/>
                ): lastImages.length === 5 && (
                    <FiveImage image={ lastImages.slice(0, 5) } quantity={ quantity }/>
                )
            }
        </div>
    );
};

interface image {
    image: string | string[];
    quantity?: number;
}

const OneImage: React.FC<image> = ({image}) => {
    if(typeof image === "string"){
        return (
            <div>
                <img src={ image } className='w-full h-64 rounded-md object-cover'/>
            </div>
        );
    }
};

const TwoImage: React.FC<image> = ({image}) => {
    if(typeof image === "object"){
        const style:string = 'w-1/2 h-64 rounded-md object-cover';
        return (
            <div className='flex'>
                <img src={ image[0] } className={`${ style } mr-0.5`}/>
                <img src={ image[1] } className={`${ style }`}/>
            </div>
        );
    }
};

const ThreeImage: React.FC<image> = ({image}) => {
    if(typeof image === "object"){
        const style:string = 'w-1/2 h-32 rounded-md object-cover';
        return (
            <div>
                <img src={ image[0] } className='w-full h-32 object-cover mb-0.5'/>
                <div className='flex'>
                    <img src={ image[1] } className={`${ style } mr-0.5`}/>
                    <img src={ image[2] } className={`${ style }`}/>
                </div>
            </div>
        );
    }
};

const FourImage: React.FC<image> = ({image}) => {
    if(typeof image === "object"){
        const style:string = 'w-1/2 h-32 rounded-md object-cover';
        return (
            <div>
                <div className='flex mb-0.5'>
                    <img src={ image[0] } className={`${ style } mr-0.5`}/>
                    <img src={ image[1] } className={`${ style }`}/>
                </div>
                <div className='flex'>
                    <img src={ image[2] } className={`${ style } mr-0.5`}/>
                    <img src={ image[3] } className={`${ style }`}/>
                </div>
            </div>
        );
    }
};

const FiveImage: React.FC<image> = ({image, quantity}) => {
    
    if(typeof image === "object"){
        const style:string = 'w-1/2 h-32 rounded-md object-cover';
        const style2:string = 'w-1/3 h-32 rounded-md object-cover mr-0.5';
        return (
            <div>
                <div className='flex mb-0.5'>
                    <img src={ image[0] } className={`${ style } mr-0.5`}/>
                    <img src={ image[1] } className={`${ style }`}/>
                </div>
                <div className='flex'>
                    <img src={ image[2] } className={`${ style2 }`}/>
                    <img src={ image[3] } className={`${ style2 }`}/>
                    <div className='w-1/3'>
                        <div className='relative'>
                            <img src={ image[4] } className='rounded-md object-cover h-32'/>
                            <div className='absolute top-1/3 left-1/3  font-bold text-3xl text-white shadow-md'>
                                {
                                    quantity !== 0 && (
                                        <span>+ { quantity }</span>
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


export default ImageRender

