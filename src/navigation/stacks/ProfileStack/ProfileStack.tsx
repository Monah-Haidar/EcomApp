import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProfileScreen } from "../../../screens/Profile/ProfileScreen";
import { EditProfileScreen } from "../../../screens/Profile/EditProfileScreen";
import { ProfileStackParamList } from "../../types";

const Stack = createNativeStackNavigator<ProfileStackParamList>();


const ProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'ios_from_right', }}>
            <Stack.Screen name="ProfileHome" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Navigator>
    );
};

export default ProfileStack;