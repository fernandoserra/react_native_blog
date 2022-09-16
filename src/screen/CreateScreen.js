import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../component/BlogPostForm";


const CreateScreen = ({ navigation }) => {

    //const [title, setTitle] = useState('');
    //const [content, setContent] = useState('');

    const { addBlogPost } = useContext(Context);

    //const {state} = useContext(Context);

    /*console.log(navigation.getParam('id'))

    const blogPost =state.find(
        blogPost => blogPost.id === navigation.getParam('id')
    );*/

    /*return (
        <View>
            <Text style={styles.label}>Enter Title</Text>
            <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)} />

            <Text style={styles.label}>Enter Content</Text>
            <TextInput style={styles.input} value={content} onChangeText={(text) => setContent(text)} />
            <Button 
                title="Add Blog Post"
                onPress={()=>{
                    addBlogPost(title,content,()=>{
                        navigation.navigate('Index');
                    })
                   
                }} />
        </View>
    );*/

    return (
        <BlogPostForm 
            onSubmit={(title,content)=>{
                addBlogPost(title,content, () => navigation.navigate('Index'))
            }}
        />
    );
};

const styles = StyleSheet.create({
    /*input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom:15,
        padding:5,
        margin:5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft:5
    }*/
})

export default CreateScreen;