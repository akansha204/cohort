import axios from "axios";

export default async function BlogPost({ params }: any) { // or we could've have given type to params like ({ params }: { params: { postId: string } })

    // const { postId } = params; OR 
    const postId = (await params).postId;
    // const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    // const post = res.data;


    return (
        <div>
            Blogs post {JSON.stringify(postId)}            {/* <br />
            title: {post.title}
            <br />
            body: {post.body} */}
        </div>
    )
}