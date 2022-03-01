import React from "react";
import { useContext, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { Drawer, Divider } from 'react-native-paper';
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
          <Divider style={{borderWidth:.5}}/>
          <DrawerItem
            label="Reset ALL Perks"
            labelStyle={styles.ResetLabel}
            onPress={() => {
              setTimeout(() => {
                SetAllActivePerks(0);
                navigation.dispatch(DrawerActions.closeDrawer());
              }, 100)
              
            }}
          >
          </DrawerItem>

          <Divider style={{borderWidth:.5}}/>

          <DrawerItem
            label="Illusion"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                moveIT(0);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              
            }}
          >
          </DrawerItem>
          
          <Divider style={{borderWidth:.5}}/>

          <DrawerItem
            label="Conjuration"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                moveIT(1);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              

            }}
          >
          </DrawerItem>

          <Divider style={{borderWidth:.5}}/>

          <DrawerItem
            label="Destruction"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                moveIT(2);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              
            }}
          >
          </DrawerItem>

          <Divider style={{borderWidth:.5}}/>

          <DrawerItem
            label="Restoration"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                moveIT(3);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              
            }}
          >
          </DrawerItem>

          <Divider style={{borderWidth:.5}}/>

          <DrawerItem
            label="Alteration"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                moveIT(4);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              
            }}
          >
          </DrawerItem>

          <Divider style={{borderWidth:.5}}/>

          <DrawerItem
            label="Enchanting"
            labelStyle={styles.ItemLabel}
            onPress={() => {
              setTimeout(() => {
                moveIT(5);
                navigation.dispatch(DrawerActions.closeDrawer());
              })
              
            }}
          >
          </DrawerItem>

          <Divider style={{borderWidth:.5}}/>

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
        
        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>

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

        <Divider style={{borderWidth:.5}}/>
        
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

        <Divider style={{borderWidth:.5}}/>

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
        <Divider style={{borderWidth:.5}}/>

        </Drawer.Section>
      </DrawerContentScrollView>

    </View>

  )
}

const styles = StyleSheet.create({

  ItemLabel: {
    borderColor: 'white',
  },
  ResetLabel: {
    fontWeight: 'bold',
    fontSize: 15,
    alignContent: 'center',
    alignSelf:'center'
  }
});