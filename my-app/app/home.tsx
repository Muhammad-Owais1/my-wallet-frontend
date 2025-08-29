import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/useUserStore";
import images from "@/constants/images";
import { router } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const home = () => {
  const { user }: any = useAuthStore();
  const [currency, setCurrency] = useState<"usd" | "gbp" | "cad">("usd");
  const flagIcons = [
    { icon: images.usFlag, code: "usd" },
    { icon: images.ukFlag, code: "gbp" },
    { icon: images.canadaFlag, code: "cad" },
  ] as const;
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-slate-900 py-8 px-4 gap-12">
        <View className="flex gap-1">
          <Text className="text-white text-2xl font-bold">{user.username}</Text>
          <Text className="text-white text-sm">{user.email}</Text>
        </View>
        <View className="bg-white py-8 rounded-3xl flex flex-row justify-between relative">
          <View className="absolute -top-5 flex flex-row gap-2 justify-center items-center w-full">
            {flagIcons.map((flag, index) => (
              <TouchableOpacity
                onPress={() => setCurrency(flag.code)}
                key={index}
                className="flex items-center justify-center rounded-full overflow-hidden w-12 h-12 border-[4px] border-slate-950 "
              >
                <Image
                  source={flag.icon}
                  className="h-12 w-12"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
          <View className="pl-4 pt-12">
            <Text className="text-5xl text-slate-800 tracking-tighter">
              {currency === "usd" && `$${user.usd}`}
              {currency === "gbp" && `£${user.gbp}`}
              {currency === "cad" && `C$${user.cad}`}
            </Text>

            <Text className="text-slate-400 mt-2">
              {currency === "usd" && "US Dollar"}
              {currency === "gbp" && "British Pound Sterling"}
              {currency === "cad" && "Canadian Dollar"}
            </Text>
          </View>

          <View className="pt-8 pr-4">
            <Image
              source={images.amountBannerImg}
              className="h-32 w-32"
              resizeMode="cover"
            />
          </View>
        </View>

        <View className="flex flex-row justify-between items-center py-8">
          <TouchableOpacity
            onPress={() => router.push("/send-money")}
            className="bg-slate-700 rounded-full h-28 w-28 flex items-center justify-center"
          >
            <Image
              resizeMode="cover"
              className="w-10 h-10"
              source={images.sendMoney}
            />
            <Text className="text-white text-sm font-semibold pt-2">Send</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-slate-700 rounded-full h-28 w-28 flex items-center justify-center">
            <Image
              resizeMode="cover"
              className="w-10 h-10"
              source={images.receiveMoney}
            />
            <Text className="text-white text-sm font-semibold pt-2">
              Receive
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-slate-700 rounded-full h-28 w-28 flex items-center justify-center">
            <Image
              resizeMode="cover"
              className="w-10 h-10"
              source={images.moreIcon}
            />
            <Text className="text-white text-sm font-semibold pt-2">More</Text>
          </TouchableOpacity>
        </View>
        <BottomSheet ref={bottomSheetRef} snapPoints={["40%", "85%"]} index={0}>
          <BottomSheetView className="p-4">
            <Text className="text-white text-lg">
              Bottom Sheet Content Here
            </Text>
            {/* Add buttons, lists, or any content */}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default home;
