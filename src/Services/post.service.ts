import axios from "axios";
import { apiUri } from "@config/api";
import { axiosHandleErrors } from "@utils/axiosApiErrors";
import { PostResponse } from "@interfaces/post.interface";

// Show posts lists
export const postGetAll = async (token: string): Promise<PostResponse> => {
    try {
        const response = await axios.get(`${apiUri}/posts`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw axiosHandleErrors(error);
    }
};

interface PostStoreProps {
    content: string;
    images: string[];
};

// Store post
export const postStore = async (data: PostStoreProps, token: string): Promise<PostResponse> => {
    try {
        const formData = new FormData();
        formData.append('content', data.content);

        const imageFiles = await convertImages(data.images);

        imageFiles.forEach((imageFile, index) => {
            formData.append(`images[${index}]`, imageFile);
        });

        const response = await axios.post(`${apiUri}/posts`, formData, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;

    } catch (error) {
        throw axiosHandleErrors(error);
    }
};

async function convertImages(images:string[]) {
    return await Promise.all(images.map(async (imageUrl) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const mimeType = blob.type;
        return new File([blob], `image.${mimeType.split('/')[1]}`, { type: mimeType });
    }));
}