import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../../../screens/Profile/ProfileScreen";
import { EditProfileScreen } from "../../../screens/Profile/EditProfileScreen";

const Stack = createNativeStackNavigator();


const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ProfileHome" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;