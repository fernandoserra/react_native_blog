import React, {useContext, useEffect} from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity, Touchable} from "react-native";
import {Context} from "../context/BlogContext";
import {Feather} from '@expo/vector-icons';


const IndexScreen= ({navigation}) =>{

    //const {data,addBlogPost} = useContext(BlogContext)
    //const {state,addBlogPost,deleteBlogPost} = useContext(Context)
    const {state,deleteBlogPost,getBlogPost} = useContext(Context)

    //  <Text>Index Screen</Text>

    //  <Button title="Add Post" onPress={addBlogPost} />

    //console.log("$$$$$$$$$")
    //console.log(state)
    //console.log("$$$$$$$$$")
    useEffect(()=>{
    
        getBlogPost();
        
      const listener =   navigation.addListener('didFocus',()=>{
            getBlogPost();
        });

        return () =>{
            listener.remove();
        }
        
    }, [] )
    return(
        <View>
          
            <FlatList 
                data={state} 
                keyExtractor={blogPosts => blogPosts.title}
                renderItem={({item})=>{
                    return(
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('Show', {id:item.id})
                        }}>
                            <View  style={styles.row}>
                                <Text style={styles.title}>{item.title} - {item.id}</Text>
                                <TouchableOpacity onPress={()=>{
                                        console.log(item.id)
                                        deleteBlogPost(item.id)
                                    }}>
                                    <Feather style={styles.icon} name="trash"/>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );

    //Nota: no podemos renderizar un objeto en react native
    // <Text>{value}</Text>    
}

IndexScreen.navigationOptions= ({navigation}) =>{
    return {
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Create')}>
            <Feather name="plus" size={30} />
          </TouchableOpacity>
        ),
      };

}

const styles =StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        paddingHorizontal:10,
        borderTopWidth:1,
        borderColor:'gray'

    },
    title:{
        fontSize:18
    },
    icon:{
        fontSize:24
    }

});


export default IndexScreen;