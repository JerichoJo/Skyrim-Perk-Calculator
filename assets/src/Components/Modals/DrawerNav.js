import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import {Drawer} from 'react-native-paper';

const moveIT = (dest) => {
    const x = (dest - ref.current.state.index)
    ref.current.scrollBy(x)
};

export function DrawerContent(props) {
  const navigation = useNavigation();
  return (
    
    <View style={{flex:1}}>
      <DrawerContentScrollView
      {...props}
      >
      
      <Drawer.Section 
        Title="Skills"
        style={{
          padding:20
        }}
      >
        <DrawerItem
          label="Illusion"
          labelStyle={styles.ItemLabel}          
          onPress={()=>{
            moveIT(0);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Conjuration"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(1);
            navigation.dispatch(DrawerActions.closeDrawer());
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Destruction"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(2);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Restoration"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(3);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Alteration"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(4);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Enchanting"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(5);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Smithing"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(6);
            navigation.dispatch(DrawerActions.closeDrawer());
            }}
        >
        </DrawerItem>

        <DrawerItem
          label="Heavy Armor"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(7);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Block"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(8);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Two-Handed"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(9);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="One-Handed"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(10);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Archery"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(11);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Light Armor"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(12);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Sneak"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(13);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Lockpicking"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(14);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Pickpocket"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(15);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>
        
        <DrawerItem
          label="Speech"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            moveIT(16);
            navigation.dispatch(DrawerActions.closeDrawer());
          }}
        >
        </DrawerItem>
        <DrawerItem
          label="Alchemy"
          labelStyle={styles.ItemLabel}
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

  ItemLabel: {
    fontWeight:'bold',
    borderColor: 'white',
        
  }
});