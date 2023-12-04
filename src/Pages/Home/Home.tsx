import React, { useEffect, useState } from "react";
import PostThoughtBanner from "./components/PostThoughtBanner";
import { getMessageError } from "@utils/axiosApiErrors";
import { useAuth } from "@hooks/useAuth";
import { postGetAll } from "@services/post.service";
import { Post } from "@interfaces/post.interface";
import Posts from "./components/Posts";
import Card from "@components/Card";
import { useAlert } from "@hooks/useAlerts";

const Home: React.FC = () => {

    const [newPost, setNewPost] = useState<Post>();
    const [posts, setPosts] = useState<Post[]>([]);
    const { authToken } = useAuth();
    const { addAlert } = useAlert();

    const handleNewPostChange = (updatedPost: Post) => {
        setNewPost(updatedPost);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await postGetAll(authToken!);
                setPosts(result.data.data);
            } catch (error) {
                addAlert('error', getMessageError(error));
            }
        };
        fetchData();
    }, [authToken]);

    useEffect(() => {
        if (newPost) {
            const nuevosPosts = [...posts];
            nuevosPosts.unshift(newPost);
            setPosts(nuevosPosts);
            setNewPost(undefined);
        }
    }, [newPost, posts]);


    return (
        <section>
            <Card>
                <PostThoughtBanner addNewPost={handleNewPostChange} />
            </Card>
            <Posts posts={posts} />
        </section>
    );
};

export default Home;