//import React, {useReducer} from "react";
import createDataContext from './createDataContext';
//const BlogContext = React.createContext();

import jsonServer from '../api/jsonServer';

const blogReducer =(state,action)=>{
    switch(action.type){
        case 'get_blogposts':
            return action.payload;

        case 'edit_blogpost':

            return state.map((blogPost)=>{
                if(blogPost.id===action.payload.id){
                    return action.payload;
                }else{
                    return blogPost;
                }
            });

        case 'delete_blogpost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        case 'add_bloggpost':
            return [...state, 
                {
                    id: Math.floor(Math.random()*99999) , 
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];    
        default:
            return state;
    }
}

const getBlogPost = dispatch =>{
    return  async () =>{
        const response = await jsonServer.get('/blogposts');
        dispatch({type:'get_blogposts', payload:response.data})
    };
};

//Local
/*const addBlogPost = (dispatch) =>{
    return (title, content,callback) =>{
        dispatch({type:'add_bloggpost', payload:{ title, content}});
        if(callback){
            callback();
        }
    };
};*/

//Enviandolo al servidor
const addBlogPost = dispatch =>{
    console.log("Ejecutando addBlogPost")
    return async (title, content,callback) =>{
        await jsonServer.post('/blogposts',{title,content})
        if(callback){
            callback();
        }
    };
};

/*const deleteBlogPost = dispatch => {
    return (id) =>{
        dispatch({type:'delete_blogpost', payload:id})
    }
}*/

const deleteBlogPost = dispatch => {
    console.log("Ejecutando deleteBlogPost")
    return async id =>{
       await jsonServer.delete(`/blogposts/${id}`)
       dispatch({type:'delete_blogpost', payload:id})
    }
}


/*const editBlogPost = dispatch => {
    return (id,title,content,callback) =>{
        dispatch({
            type:'edit_blogpost', 
            payload:{id, title, content}
        })
        if(callback){
            callback();
        } 
    }
}*/

const editBlogPost = dispatch => {
    console.log("Ejecutando editBlogPost")
    return  async(id,title,content,callback) =>{
        
        await jsonServer.put(`/blogposts/${id}`, {title,content});
        
        dispatch({
            type:'edit_blogpost', 
            payload:{id, title, content}
        })
        if(callback){
            callback();
        }     
    }
}

/*

export const BlogProvider = ({ children }) =>{

    const [blogPosts,dispatch]= useReducer(blogReducer,[]);

    //const [blogPosts,setBlogPosts]= useState([]);
    /*const blogPosts =[
        {title: 'Blog Post #1'},
        {title: 'Blog Post #2'},
        {title: 'Blog Post #3'}
    ];*/

    /*const addBlogPost = () =>{
        setBlogPosts([...blogPosts,{ title: `Blog Post #${blogPosts.length + 1}`}]);
    }*/
/*
    return (
        <BlogContext.Provider value={{data:blogPosts,addBlogPost}}>{children}</BlogContext.Provider>
    );

    // <BlogContext.Provider value={{data:blogPosts, addBlogPost:addBlogPost}}>{children}</BlogContext.Provider>
};
*/



//export default BlogContext;

export const { Context, Provider } = createDataContext(
    blogReducer, 
    {addBlogPost,deleteBlogPost,editBlogPost,getBlogPost}, 
    //[{title:'TEST POST', content:'TEST CONTENT', id:1}]
    []
);