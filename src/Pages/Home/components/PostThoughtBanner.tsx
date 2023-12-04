import React, { useState } from 'react';
import ImageProfileAndContent from '@components/ImageProfileAndContent';
import { useAuth } from '@hooks/useAuth';
import { Post } from '@interfaces/post.interface';
import CreatePostModal from './modals/CreatePostModal';

interface PostThoughtBannerProps {
    addNewPost: (updatedPost: Post) => void;
}

const PostThoughtBanner: React.FC<PostThoughtBannerProps> = ({ addNewPost }) => {
    const { user } = useAuth();
    const [openCreateModal, setOpenCreateModal] = useState(false);

    const handleOpenCreatePostModal = () => {
        setOpenCreateModal(!openCreateModal);
    };

    return (
        <>
            <div className='h-auto '>
                <div className='flex items-center'>
                    <ImageProfileAndContent
                        img={user?.photo}
                    />
                    <button type='button'
                        onClick={handleOpenCreatePostModal}
                        className='bg-gray-200 h-10 w-full ml-1 text-gray-600 text-left px-3 rounded-2xl'>What do you think?
                    </button>
                </div>
            </div>
            {
                openCreateModal && (
                    <>
                        <CreatePostModal
                            userName={user!.name}
                            openCreateModal={openCreateModal}
                            setOpenCreateModal={setOpenCreateModal}
                            addNewPost={addNewPost}
                        />
                    </>
                )
            }
        </>
    );
};

export default PostThoughtBanner;