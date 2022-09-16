import React from "react";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import IndexScreen from "./src/screen/IndexScreen";
import ShowScreen from "./src/screen/ShowScreen";
import CreateScreen from "./src/screen/CreateScreen";
//import { BlogProvider } from "./src/context/BlogContext";
import { Provider } from "./src/context/BlogContext";
import EditScreen from "./src/screen/EditScreen";


const navigator = createStackNavigator({
    Index:IndexScreen,
	Show:ShowScreen,
	Create:CreateScreen,
	Edit:EditScreen
},{
	initialRouteName:'Index',
	defaultNavigationOptions:{
		title:'Blogs'
	}

});


//export default createAppContainer(navigator);
const App = createAppContainer(navigator);

export default () =>{
	return(
		<Provider> 
			<App/> 
		</Provider>
	);
};