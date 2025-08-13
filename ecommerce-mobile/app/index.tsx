import { StyleSheet, Text, View, FlatList, useWindowDimensions } from "react-native";
import products from '../assets/products.json';
import ProductListItem from "../components/ProductListItem"; 
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import {Button, ButtonText} from "@/components/ui/button";


export default function HomeScreen() {

  // const {width} = useWindowDimensions();
  // const numColumns = width > 700 ? 3 : 2;

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4
  });

  return (
      <FlatList 
         key={numColumns}
         data = {products}
         numColumns={numColumns}
         contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
         columnWrapperClassName="gap-2"
         renderItem = {({item}) => <ProductListItem product={item}/>}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
