import "@/global.css";
import {Slot, Stack, Tabs} from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Icon } from "@/components/ui/icon";
import { ShoppingCart } from "lucide-react-native";
import { Link } from "expo-router";
import { Pressable } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout(){
    return (
    <QueryClientProvider client ={queryClient}>
    <GluestackUIProvider>
        <Stack screenOptions={{headerRight:() =>( 
            <Link href={'/cart'} asChild>
                <Pressable>
                    <Icon as={ShoppingCart}/>
                </Pressable>
            </Link>        
            ),
            }}>      
            <Stack.Screen name="index" options={{title: 'Shop'}} />
            <Stack.Screen name="product/[id]" options={{title: 'Product'}} />
        </Stack>
    </GluestackUIProvider>
    </QueryClientProvider>    
    
);
}