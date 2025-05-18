import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../../../screens/Profile/ProfileScreen";
import { EditProfileScreen } from "../../../screens/Profile/EditProfileScreen";

const Stack = createNativeStackNavigator();


const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;