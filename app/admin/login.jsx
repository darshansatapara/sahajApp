import { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "../Stores/useUserStore.js";
import "../../global.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loading } = useUserStore();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      console.log(email, password);
      await loginUser({ email, password });
      router.push("/admin/userDetails");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-6 justify-center">
      <View className="bg-white p-8 rounded-2xl shadow-lg">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </Text>

        <View className="space-y-5">
          <View>
            <Text className="text-gray-600 mb-2 font-medium">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 bg-gray-50 text-gray-800"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-600 mb-2 font-medium">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-xl p-4 bg-gray-50 text-gray-800"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-blue-600 py-4 rounded-xl flex items-center justify-center shadow-md mt-7"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-lg font-semibold">Login</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
