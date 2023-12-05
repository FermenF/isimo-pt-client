import React, { useState } from 'react';
import ImageProfileAndContent from '@components/ImageProfileAndContent';
import { useAlert } from '@hooks/useAlerts';
import { Post } from '@interfaces/post.interface';
import { getMessageError } from '@utils/axiosApiErrors';
import { postStore } from '@services/post.service';
import { capitalizeText } from '@utils/string.utils';
import { IoIosCloseCircle } from 'react-icons/io';
import { useAuth } from '@hooks/useAuth';
import Images from './Images';

interface CreatePostModalProps {
    userName: string | undefined;
    openCreateModal: boolean;
    setOpenCreateModal: (value: boolean) => void;
    addNewPost: (value: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ userName, openCreateModal, setOpenCreateModal, addNewPost }) => {

    const { addAlert } = useAlert();
    const { user, authToken } = useAuth();

    const [content, setContent] = useState("");
    const [textAreaRows, setTextAreaRows] = useState(1);
    const [images, setImages] = useState<string[]>([]);
    const [message, setMessage] = useState("");

    const handleSetContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setContent(value);
        setTextAreaRows(3);
        value === "" && setTextAreaRows(1);
    };

    const handleImages = async (newImages: string[]) => {
        setImages(newImages);
    };

    const handleCloseModal = (): void => {
        setOpenCreateModal(!openCreateModal);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (images.length === 0 && !content) {
            setMessage("Imagen o contenido es requerido,");
        } else {
            try {
                const result = await postStore({ content, images}, authToken!);
                const post = {... result.data, user}
                addNewPost(post as unknown as Post);
                addAlert('success', result.message);
                setMessage("");
                handleCloseModal();
            } catch (error) {
                addAlert('error', getMessageError(error));
            }
        }
    };

    return (
        <>
            <div tabIndex={-1} aria-hidden="true" className={`${openCreateModal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full`} style={{ background: 'rgba(169, 169, 169, 0.7)' }}>
                <div className="relative p-4 w-full md:w-3/4 lg:w-2/4 xl:w-1/4 max-w-2xl ">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="flex items-center justify-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl w-full text-gray-900 text-center font-bold">Create Post</h3>
                                <button type="button" onClick={handleCloseModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="create-post-modal">
                                    <IoIosCloseCircle />
                                </button>
                            </div>
                            <div className="p-3">
                                <ImageProfileAndContent
                                    onlyImage={false}
                                    title={capitalizeText(userName)} />
                                <p className='text-red-700 font-semibold'>
                                    {message}
                                </p>
                                <div className='mt-5'>
                                    <textarea id='content-area' placeholder={`What do you think, ${capitalizeText(userName)}?`} className="w-full border-white focus:ring-white focus:border-white"
                                        value={content} rows={textAreaRows} onChange={event => handleSetContent(event)}></textarea>
                                </div>
                                <Images images={images} onUpdate={handleImages} />
                            </div>
                            <div className="items-center p-4 md:p-5 dark:border-gray-600">
                                <button type="submit" data-modal-hide="create-post-modal" className="text-white w-full bg-black hover:bg-slate-800 focus:ring-0 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center">Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePostModal;
