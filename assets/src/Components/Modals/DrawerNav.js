import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {Drawer} from 'react-native-paper';


const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const moveIT = (dest) => {
    const x = (dest - ref.current.state.index)
    ref.current.scrollBy(x)
};

export function DrawerContent(props) {
  const navigation = useNavigation();
  return (
    
    <View style={{flex:1}}>
      <DrawerContentScrollView{...props}>

      
      <Drawer.Section 
        Title="Skills"
        style={{
          padding:20
        }}
      >
        <DrawerItem
          label="Illusion"
          
          onPress={()=>{
            moveIT(0);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Conjuration"
          onPress={()=>{
            moveIT(1);
            navigation.dispatch(DrawerActions.closeDrawer());
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Destruction"
          onPress={()=>{
            moveIT(2);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Restoration"
          onPress={()=>{
            moveIT(3);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Alteration"
          onPress={()=>{
            moveIT(4);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Enchanting"
          onPress={()=>{
            moveIT(5);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Smithing"
          onPress={()=>{
            moveIT(6);
            navigation.dispatch(DrawerActions.closeDrawer());
            }}
        >
        </DrawerItem>

        <DrawerItem
          label="Heavy Armor"
          onPress={()=>{
            moveIT(7);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Block"
          onPress={()=>{
            moveIT(8);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Two-Handed"
          onPress={()=>{
            moveIT(9);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="One-Handed"
          onPress={()=>{
            moveIT(10);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Archery"
          onPress={()=>{
            moveIT(11);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Light Armor"
          onPress={()=>{
            moveIT(12);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Sneak"
          onPress={()=>{
            moveIT(13);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Lockpicking"
          onPress={()=>{
            moveIT(14);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Pickpocket"
          onPress={()=>{
            moveIT(15);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>
        
        <DrawerItem
          label="Speech"
          onPress={()=>{
            moveIT(16);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>
        <DrawerItem
          label="Alchemy"
          onPress={()=>{
            moveIT(17);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

      </Drawer.Section>
      </DrawerContentScrollView>
      
    </View>

  )
}

const styles = StyleSheet.create({
  
});