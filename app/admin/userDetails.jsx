// import { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   BackHandler,
//   Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import useUserStore from "../Stores/useUserStore.js";
// import useProductStore from "../Stores/useProductStore.js";
// import "../../global.css";

// export default function UserDetails() {
//   const router = useRouter();
//   const { users, fetchUsers, logoutUser } = useUserStore();
//   const { products, fetchProducts } = useProductStore();
//   const [selectedTab, setSelectedTab] = useState("users");

//   useEffect(() => {
//     fetchUsers();
//     fetchProducts();

//     const backAction = () => {
//       Alert.alert("Exit App", "Are you sure you want to exit?", [
//         { text: "Cancel", style: "cancel" },
//         { text: "Exit", onPress: () => BackHandler.exitApp() },
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );
//     return () => backHandler.remove();
//   }, []);

//   const handleLogout = async () => {
//     await logoutUser();
//     router.push("/admin/login");
//   };

//   const data = selectedTab === "users" ? users : products;

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       {/* Tab Selection */}
//       <View className="flex-row justify-between bg-white p-4 rounded-xl shadow-md mb-4">
//         <TouchableOpacity
//           onPress={() => setSelectedTab("users")}
//           className={`flex-1 p-3 mx-1 rounded-lg text-center ${selectedTab === "users" ? "bg-blue-500" : "bg-gray-300"
//             }`}
//         >
//           <Text className="text-white text-center font-semibold">Users</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => setSelectedTab("products")}
//           className={`flex-1 p-3 mx-1 rounded-lg text-center ${selectedTab === "products" ? "bg-blue-500" : "bg-gray-300"
//             }`}
//         >
//           <Text className="text-white text-center font-semibold">Products</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Data Table */}
//       <View className="bg-white p-4 rounded-xl shadow-md flex-1">
//         <FlatList
//           data={data}
//           keyExtractor={(item) => item.id.toString()}
//           ListHeaderComponent={() => (
//             <View className="flex-row justify-between border-b pb-2">
//               <Text className="font-bold text-gray-700 flex-1">
//                 {selectedTab === "users" ? "Name" : "Product Name"}
//               </Text>
//               <Text className="font-bold text-gray-700 flex-1 text-center">
//                 {selectedTab === "users" ? "Email" : "Price"}
//               </Text>
//               <Text className="font-bold text-gray-700 flex-1 text-right">
//                 {selectedTab === "users" ? "Phone" : "Stock"}
//               </Text>
//             </View>
//           )}
//           renderItem={({ item }) => (
//             <View className="flex-row justify-between py-2 border-b">
//               <Text className="flex-1 text-gray-800">
//                 {selectedTab === "users" ? item.name : item.productName}
//               </Text>
//               <Text className="flex-1 text-center text-gray-600">
//                 {selectedTab === "users" ? item.email : `$${item.price}`}
//               </Text>
//               <Text className="flex-1 text-right text-gray-600">
//                 {selectedTab === "users" ? item.phone : item.stock}
//               </Text>
//             </View>
//           )}
//         />
//       </View>

//       <TouchableOpacity
//         onPress={handleLogout}
//         className="bg-red-500 py-3 rounded-lg mt-4 shadow-md"
//       >
//         <Text className="text-white text-center font-semibold text-lg">
//           Logout
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }



import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import useUserStore from "../Stores/useUserStore.js";
import useProductStore from "../Stores/useProductStore.js";
import "../../global.css";
import useCustomerStore from "../Stores/useCustomerStore.js";

export default function UserDetails() {
  const router = useRouter();
  const { customers, fetchCustomers, loading: customerLoading, error: customerError } = useCustomerStore();
  const { logoutUser } = useUserStore();
  const { products, fetchProducts, loading: productLoading, error: productError } = useProductStore();
  const [selectedTab, setSelectedTab] = useState("users");

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, [selectedTab]);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/admin/login");
  };

  const data = selectedTab === "users" ? customers : products;
  const loading = selectedTab === "users" ? customerLoading : productLoading;
  const error = selectedTab === "users" ? customerError : productError;

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Tab Selection */}
      <View className="flex-row justify-between bg-white p-4 rounded-xl shadow-md mb-4">
        <TouchableOpacity
          onPress={() => setSelectedTab("users")}
          className={`flex-1 p-3 mx-1 rounded-lg text-center ${selectedTab === "users" ? "bg-blue-500" : "bg-gray-300"
            }`}
        >
          <Text className="text-white text-center font-semibold">Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab("products")}
          className={`flex-1 p-3 mx-1 rounded-lg text-center ${selectedTab === "products" ? "bg-blue-500" : "bg-gray-300"
            }`}
        >
          <Text className="text-white text-center font-semibold">Products</Text>
        </TouchableOpacity>
      </View>

      {/* Loading and Error Handling */}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text className="text-red-500 text-center">{error}</Text>}

      {/* Data Table */}
      {!loading && !error && (
        <View className="bg-white p-4 rounded-xl shadow-md flex-1">
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={() => (
              <View className="flex-row justify-between border-b pb-2">
                <Text className="font-bold text-gray-700 flex-1">
                  {selectedTab === "users" ? "Name" : "Product Name"}
                </Text>
                <Text className="font-bold text-gray-700 flex-1 text-center">
                  {selectedTab === "users" ? "Email" : "Weight"}
                </Text>
                <Text className="font-bold text-gray-700 flex-1 text-right">
                  {selectedTab === "users" ? "Phone" : "Price"}
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View className="flex-row justify-between py-2 border-b">
                <Text className="flex-1 text-gray-800">
                  {selectedTab === "users" ? item?.name : item?.name}
                </Text>
                <Text className="flex-1 text-center text-gray-600">
                  {selectedTab === "users" ? item?.email : item?.weight}
                </Text>
                <Text className="flex-1 text-right text-gray-600">
                  {selectedTab === "users" ? item?.phone : `₹${item?.price}`}
                </Text>
              </View>
            )}
          />
        </View>
      )}

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
