import React from "react";
import { capitalizeText } from "@utils/string.utils";
import FormattedDate from "./FormattedDate";

interface ImageProfileAndContentProps {
    onlyImage?: boolean;
    img?: string | null | undefined;
    title?: string | "";
    timeAgo?: Date;
}

const ImageProfileAndContent: React.FC<ImageProfileAndContentProps> = ({ onlyImage = true, img, title = "", timeAgo = null }) => {
    return (
        <div className="flex items-center">
            {
                img ? (
                    <img src={img} className="h-12 w-12 rounded-full" />
                ) : (
                    <img src="https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX25634104.jpg" className="max-h-11 max-w-12 rounded-full" />
                )
            }
            {
                !onlyImage && (
                    <div className="ml-1">
                        <h6 className="font-semibold">{capitalizeText(title)}</h6>
                        {
                            // !timeAgo ? (
                                // <select id="countries" defaultValue={1} className="bg-gray-50 border h-9 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-white focus:border-white block w-full">
                                //     <option value={1}>Public</option>
                                //     <option value={2}>Only Me</option>
                                // </select>
                            // ) 
                            timeAgo && (
                                <div className="flex text-gray-500 items-center">
                                    <span className="text-sm mr-1">
                                        <FormattedDate dateTime={timeAgo} />
                                    </span>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ImageProfileAndContent;