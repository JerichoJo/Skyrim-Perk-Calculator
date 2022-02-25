import React from "react";
import { useContext, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Drawer } from 'react-native-paper';
import { AllActivePerkss } from '../../../../StackNavigator';

const moveIT = (dest) => {
  const x = (dest - ref.current.state.index)
  ref.current.scrollBy(x)
};



export function DrawerContent(props) {
  const [AllActivePerks, SetAllActivePerks] = useContext(AllActivePerkss);

  const navigation = useNavigation();
  return (

    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
      >

        <Drawer.Section
          Title="Skills"
          style={{
            padding: 20
          }}
        >
          <DrawerItem
            label="Reset ALL Perks"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                SetAllActivePerks(0);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              
            }}
          >
          </DrawerItem>
          <DrawerItem
            label="Illusion"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              moveIT(0);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
          </DrawerItem>

          <DrawerItem
            label="Conjuration"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              moveIT(1);
              navigation.dispatch(DrawerActions.closeDrawer());

            }}
          >
          </DrawerItem>

          <DrawerItem
            label="Destruction"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              moveIT(2);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
          </DrawerItem>

          <DrawerItem
            label="Restoration"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              moveIT(3);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
          </DrawerItem>

          <DrawerItem
            label="Alteration"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              moveIT(4);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
          </DrawerItem>

          <DrawerItem
            label="Enchanting"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              moveIT(5);
              navigation.dispatch(DrawerActions.closeDrawer());
            }}
          >
          </DrawerItem>

        <DrawerItem
          label="Smithing"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(6);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
            }}
        >
        </DrawerItem>

        <DrawerItem
          label="Heavy Armor"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(7);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Block"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(8);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Two-Handed"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(9);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="One-Handed"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(10);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Archery"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(11);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Light Armor"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(12);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Sneak"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(13);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Lockpicking"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(14);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>

        <DrawerItem
          label="Pickpocket"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(15);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>
        
        <DrawerItem
          label="Speech"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(16);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
          }}
        >
        </DrawerItem>
        <DrawerItem
          label="Alchemy"
          labelStyle={styles.ItemLabel}
          onPress={()=>{
            setTimeout(() => {
              moveIT(17);
            navigation.dispatch(DrawerActions.closeDrawer());
            }, 100)
            
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
    fontWeight: 'bold',
    borderColor: 'white',

  }
});