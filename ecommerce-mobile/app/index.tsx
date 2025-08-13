import { StyleSheet, Text, View, FlatList } from "react-native";
import products from '../assets/products.json';
import ProductListItem from "../components/ProductListItem"; 
import {Button, ButtonText} from "@/components/ui/button";


export default function HomeScreen() {
  return (
      <FlatList 
         data = {products}
         numColumns={2}
         contentContainerClassName="gap-2"
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
