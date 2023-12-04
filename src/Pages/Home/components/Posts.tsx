import { Post } from '@interfaces/post.interface';
import React from 'react';
import Card from '@components/Card';
import PostComponent from './PostComponent';
import { User } from '@interfaces/user.interface';

interface PostsProps {
    posts: Post[];
    userData?: User;
}

const Posts: React.FC<PostsProps> = ({ posts, userData }) => {

    if (posts.length <= 0) {
        return <WithOutPosts user={userData} />
    }

    return (
        posts.map((post, i) => (
            <Card key={i} padding={'p-0'}>
                <PostComponent post={post} userData={userData} />
            </Card>
        ))
    );

};

interface WithOutPostsProps {
    user: User | undefined | null;
}

const WithOutPosts: React.FC<WithOutPostsProps> = ({ user }) => {
    let message: string = "Publica y visualiza 'posts' de la comuniadad {':)'} .";
    if (user) {
        message = "El usuario " + user.name + " no tiene publicaciones registradas.";
    }
    return (
        <Card>
            <div className='flex items-center'>
                <p className='mr-1'>{message}</p>
            </div>
        </Card>
    );
}

export default Posts;