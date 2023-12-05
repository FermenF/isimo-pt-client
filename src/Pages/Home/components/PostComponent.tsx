import React, { useState } from 'react';
import { Post } from '@interfaces/post.interface';
import ImageProfileAndContent from '@components/ImageProfileAndContent';
import PostImages from './PostImages';
import { User } from '@interfaces/user.interface';
import ShowPostModal from './modals/ShowPostModal';

interface PostPros {
    post: Post;
    userData?: User;
}

const PostComponent: React.FC<PostPros> = ({ post, userData }) => {

    let { user } = post;
    if (!user && userData) {
        user = userData;
    }

    const [openPostModal, setOpenPostModal] = useState(false);

    const handleShowOpenModal = () => {
        setOpenPostModal(!openPostModal);
    };

    return (
        <>
            <div className="pb-5" id={String(post.id)}>
                <div className='flex justify-between items-center pt-5 px-5'>
                    <ImageProfileAndContent
                        onlyImage={false}
                        img={user.photo}
                        title={user.name}
                        timeAgo={post.created_at}
                    />
                </div>
                <div className='my-3' >
                    <p className='px-5 my-2.5'>{post.content}</p>
                    <div className='cursor-pointer' onClick={handleShowOpenModal}>
                        <PostImages images={post.post_images} />
                    </div>
                </div>
            </div>
            {
                openPostModal && (
                    <ShowPostModal images={ post.post_images } openPostModal={ openPostModal } handleShowOpenModal={ handleShowOpenModal }/>
                )
            }
        </>
    );
};

export default PostComponent; 