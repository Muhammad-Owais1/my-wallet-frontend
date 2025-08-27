import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useState } from "react";
import { router } from "expo-router";
import { useAuthStore } from "@/store/useUserStore";

export default function Index() {
  const { setUser } = useAuthStore();

  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg]: any = useState(null);

  const loginUser = async () => {
    try {
      const res: any = await axios.post(
        "http://192.168.1.102:2000/api/auth/login",
        authData
      );
      if (res.data.length === 0) {
        setMsg("Invalid credentials");
      } else {
        setUser(res.data);
        router.replace("/home");
      }
    } catch (err: any) {
      console.log(err?.response.data);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900 items-center justify-center">
      <View className="flex gap-4">
        <Text className="text-white text-3xl font-bold">Login</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="lightgrey"
          value={authData.email}
          onChange={(e) =>
            setAuthData({ ...authData, email: e.nativeEvent.text })
          }
          className="border-white text-white border-[1px] w-[80vw] px-4 rounded-lg"
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="lightgrey"
          value={authData.password}
          secureTextEntry
          onChange={(e) =>
            setAuthData({ ...authData, password: e.nativeEvent.text })
          }
          className="border-white text-white border-[1px] w-[80vw] px-4 rounded-lg"
        />
        {msg && <Text className="text-white">{msg}</Text>}
        <TouchableOpacity
          onPress={loginUser}
          className="bg-white py-3 flex items-center rounded-lg"
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
