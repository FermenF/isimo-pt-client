import { Post } from '@interfaces/post.interface';
import React from 'react';
import Card from '@components/Card';
import PostComponent from './PostComponent';

interface PostsProps {
    posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => {

    if (posts.length <= 0) {
        return <WithOutPosts />
    }

    return (
        posts.map((post, i) => (
            <Card key={i} padding={'p-0'}>
                <PostComponent post={post} />
            </Card>
        ))
    );

};

function WithOutPosts() {
    return (
        <Card>
            <div className='flex items-center'>
                <p className='mr-1'>Publica y visualiza 'posts' de la comuniadad {':)'} .</p>
            </div>
        </Card>
    );
}

export default Posts;