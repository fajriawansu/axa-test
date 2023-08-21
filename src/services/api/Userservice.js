const { default: ApiService } = require("../Apiservice");

const BASE_URL = process.env.REACT_APP_BASE_URL;

async function GetUserList(){
    const resp = await ApiService.invokeGet(BASE_URL + "/users");
    return resp
}

async function GetPostList(){
    const resp = await ApiService.invokeGet(BASE_URL + "/posts");
    return resp
}

async function DeletePostById(id){
    const resp = await ApiService.invokeDelete(BASE_URL + `/posts/${id}`);
    return resp
}

async function GetAlbumList(){
    const resp = await ApiService.invokeGet(BASE_URL + "/albums");
    return resp
}

async function GetUserDetail(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/users/${id}`);
    return resp
}

async function GetPostByUserId(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/users/${id}/posts`);
    return resp
}

async function GetPostById(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/posts/${id}`);
    return resp
}

async function GetCommentByPostId(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/posts/${id}/comments`);
    return resp
}

async function GetAlbumByUserId(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/users/${id}/albums`);
    return resp
}

async function GetAlbumById(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/albums/${id}`);
    return resp
}

async function GetPhotoByAlbumId(id){
    const resp = await ApiService.invokeGet(BASE_URL + `/albums/${id}/photos`);
    return resp
}

async function CreatePost(data){
    const resp = await ApiService.invokePost(BASE_URL + "/posts", {
        title: data?.title,
        body: data?.body,
        userId: data?.userId
    })
    return resp
}

async function UpdatePost(postId, data){
    const resp = await ApiService.invokePut(BASE_URL + `/posts/${postId}`, {
        id: postId,
        title: data?.title,
        body: data?.body,
        userId: data?.userId
    })
    return resp
}

async function DeleteCommentById(id){
    const resp = await ApiService.invokeDelete(BASE_URL + `/comments/${id}`);
    return resp
}

const UserService = {
    GetUserList,
    GetPostList,
    GetAlbumList,
    GetUserDetail,
    GetPostByUserId,
    GetAlbumByUserId,
    GetPostById,
    GetCommentByPostId,
    GetAlbumById,
    GetPhotoByAlbumId,
    CreatePost,
    UpdatePost,
    DeletePostById,
    DeleteCommentById
}
 
export default UserService