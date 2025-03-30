import { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "../Stores/useUserStore.js";
import "../../global.css";

export default function UserDetails() {
  const router = useRouter();
  const { users, fetchUsers, logoutUser } = useUserStore();

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts

    const backAction = () => {
      Alert.alert("Exit App", "Are you sure you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  console.log(users);
  const handleLogout = async () => {
    await logoutUser();
    router.push("/admin/login");
  };

  const activeUsersCount = users.map((user) => user.isActive).length;

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-white p-6 rounded-xl shadow-md mb-4">
        <Text className="text-2xl font-bold text-center mb-2">
          User Details
        </Text>
        <Text className="text-lg text-center text-gray-600">
          Active Users: {activeUsersCount}
        </Text>
      </View>

      <View className="bg-white p-4 rounded-xl shadow-md flex-1">
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => (
            <View className="flex-row justify-between border-b pb-2">
              <Text className="font-bold text-gray-700 flex-1">Name</Text>
              <Text className="font-bold text-gray-700 flex-1 text-center">
                Email
              </Text>
              <Text className="font-bold text-gray-700 flex-1 text-right">
                Phone
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View className="flex-row justify-between py-2 border-b">
              <Text className="flex-1 text-gray-800">{item.name}</Text>
              <Text className="flex-1 text-center text-gray-600">
                {item.email}
              </Text>
              <Text className="flex-1 text-right text-gray-600">
                {item.phone}
              </Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-500 py-3 rounded-lg mt-4 shadow-md"
      >
        <Text className="text-white text-center font-semibold text-lg">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
