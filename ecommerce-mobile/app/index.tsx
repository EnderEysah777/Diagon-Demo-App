import { StyleSheet, Text, View, FlatList, useWindowDimensions, ActivityIndicator } from "react-native";
import products from '../assets/products.json';
import ProductListItem from "../components/ProductListItem"; 
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import {Button, ButtonText} from "@/components/ui/button";
import {useEffect, useState} from 'react';
import { listProducts } from "@/api/products";
import {useQuery} from '@tanstack/react-query';

export default function HomeScreen() {
  const {data, isLoading, error} = useQuery({
    queryKey: ['products'], 
    queryFn: listProducts,
  });

  const numColumns = useBreakpointValue({
    default: 2,
    sm: 3,
    xl: 4
  });

if(isLoading){
  return <ActivityIndicator/>;
}

if(error){
  return <Text>Error loading products</Text>;
}

  return (
      <FlatList 
         key={numColumns}
         data = {data}
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
