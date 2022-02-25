import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Text, Dimensions, LogBox, View } from 'react-native';
import { useState } from 'react';
LogBox.ignoreLogs(["Require cycle:"]);
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./assets/src/HomeScreen";
import { DrawerContent } from './assets/src/Components/Modals/DrawerNav';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import modals from './assets/src/Components/Modals/index';

const Drawer = createDrawerNavigator();
const ModalNav = createNativeStackNavigator();

export const AllActivePerkss = React.createContext(0);

function Modal() {
    return (

        <ModalNav.Navigator screenOptions={{ headerShown: false }}  >

            <ModalNav.Screen name="Homescreen" component={HomeScreen} />

            {/* Smithing Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="BasicSmithingModal" component={modals.BasicSmithingModal} />
                <ModalNav.Screen name="ArcaneSmithingModal" component={modals.ArcaneSmithingModal} />
                <ModalNav.Screen name="ElvenSmithingModal" component={modals.ElvenSmithingModal} />
                <ModalNav.Screen name="AdvancedArmorsSmithingModal" component={modals.AdvancedArmorsSmithingModal} />
                <ModalNav.Screen name="GlassSmithingModal" component={modals.GlassSmithingModal} />
                <ModalNav.Screen name="DragonArmorSmithingModal" component={modals.DragonArmorSmithingModal} />
                <ModalNav.Screen name="DaedricSmithingModal" component={modals.DaedricSmithingModal} />
                <ModalNav.Screen name="EbonySmithingModal" component={modals.EbonySmithingModal} />
                <ModalNav.Screen name="OrcishSmithingModal" component={modals.OrcishSmithingModal} />
                <ModalNav.Screen name="DwarvenSmithingModal" component={modals.DwarvenSmithingModal} />
            </ModalNav.Group>

            {/* Speech Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="HagglingModal" component={modals.HagglingModal} />
                <ModalNav.Screen name="AllureModal" component={modals.AllureModal} />
                <ModalNav.Screen name="MerchantModal" component={modals.MerchantModal} />
                <ModalNav.Screen name="InvestorModal" component={modals.InvestorModal} />
                <ModalNav.Screen name="FenceModal" component={modals.FenceModal} />
                <ModalNav.Screen name="MasterTraderModal" component={modals.MasterTraderModal} />
                <ModalNav.Screen name="BriberyModal" component={modals.BriberyModal} />
                <ModalNav.Screen name="PersuasionModal" component={modals.PersuasionModal} />
                <ModalNav.Screen name="IntimidationModal" component={modals.IntimidationModal} />
            </ModalNav.Group>

            {/* Illusion Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="NoviceIllusionModal" component={modals.NoviceIllusionModal} />
                <ModalNav.Screen name="IllusionDualCastingModal" component={modals.IllusionDualCastingModal} />
                <ModalNav.Screen name="ApprenticeIllusionModal" component={modals.ApprenticeIllusionModal} />
                <ModalNav.Screen name="AdeptIllusionModal" component={modals.AdeptIllusionModal} />
                <ModalNav.Screen name="ExpertIllusionModal" component={modals.ExpertIllusionModal} />
                <ModalNav.Screen name="MasterIllusionModal" component={modals.MasterIllusionModal} />
                <ModalNav.Screen name="HypnoticGazeModal" component={modals.HypnoticGazeModal} />
                <ModalNav.Screen name="AspectOfTerrorModal" component={modals.AspectOfTerrorModal} />
                <ModalNav.Screen name="RageModal" component={modals.RageModal} />
                <ModalNav.Screen name="MasterOfTheMindModal" component={modals.MasterOfTheMindModal} />
                <ModalNav.Screen name="AnimageModal" component={modals.AnimageModal} />
                <ModalNav.Screen name="KindredMageModal" component={modals.KindredMageModal} />
                <ModalNav.Screen name="QuietCastingModal" component={modals.QuietCastingModal} />
            </ModalNav.Group>

            {/* Light Armor Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="AgileDefenderModal" component={modals.AgileDefenderModal} />
                <ModalNav.Screen name="CustomFitModal" component={modals.CustomFitModal} />
                <ModalNav.Screen name="UnhinderedModal" component={modals.UnhinderedModal} />
                <ModalNav.Screen name="WindWalkerModal" component={modals.WindWalkerModal} />
                <ModalNav.Screen name="DeftMovementModal" component={modals.DeftMovementModal} />
                <ModalNav.Screen name="MatchingSetModal" component={modals.MatchingSetModal} />
            </ModalNav.Group>

            {/* Alteration Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="NoviceAlterationModal" component={modals.NoviceAlterationModal} />
                <ModalNav.Screen name="AlterationDualCastingModal" component={modals.AlterationDualCastingModal} />
                <ModalNav.Screen name="ApprenticeAlterationModal" component={modals.ApprenticeAlterationModal} />
                <ModalNav.Screen name="MageArmorModal" component={modals.MageArmorModal} />
                <ModalNav.Screen name="MagicResistanceModal" component={modals.MagicResistanceModal} />
                <ModalNav.Screen name="AdeptAlterationModal" component={modals.AdeptAlterationModal} />
                <ModalNav.Screen name="StabilityModal" component={modals.StabilityModal} />
                <ModalNav.Screen name="ExpertAlterationModal" component={modals.ExpertAlterationModal} />
                <ModalNav.Screen name="AtronachModal" component={modals.AtronachModal} />
                <ModalNav.Screen name="MasterAlterationModal" component={modals.MasterAlterationModal} />
            </ModalNav.Group>

                {/* Archery Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="BullseyeModal" component={modals.BullseyeModal} />
                <ModalNav.Screen name="CriticalShotModal" component={modals.CriticalShotModal} />
                <ModalNav.Screen name="EagleEyeModal" component={modals.EagleEyeModal} />
                <ModalNav.Screen name="HuntersDisciplineModal" component={modals.HuntersDisciplineModal} />
                <ModalNav.Screen name="OverdrawModal" component={modals.OverdrawModal} />
                <ModalNav.Screen name="PowerShotModal" component={modals.PowerShotModal} />
                <ModalNav.Screen name="QuickShotModal" component={modals.QuickShotModal} />
                <ModalNav.Screen name="RangerModal" component={modals.RangerModal} />
                <ModalNav.Screen name="SteadyHandModal" component={modals.SteadyHandModal} />
            </ModalNav.Group>

                {/* Restoration Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="AdeptModal" component={modals.AdeptModal} />
                <ModalNav.Screen name="ApprenticeModal" component={modals.ApprenticeModal} />
                <ModalNav.Screen name="AvoidDeathModal" component={modals.AvoidDeathModal} />
                <ModalNav.Screen name="DualCastingModal" component={modals.DualCastingModal} />
                <ModalNav.Screen name="ExpertModal" component={modals.ExpertModal} />
                <ModalNav.Screen name="MasterModal" component={modals.MasterModal} />
                <ModalNav.Screen name="NecromageModal" component={modals.NecromageModal} />
                <ModalNav.Screen name="NoviceModal" component={modals.NoviceModal} />
                <ModalNav.Screen name="RecoveryModal" component={modals.RecoveryModal} />
                <ModalNav.Screen name="RegenerationModal" component={modals.RegenerationModal} />
                <ModalNav.Screen name="RespiteModal" component={modals.RespiteModal} />
                <ModalNav.Screen name="WardAbsorbModal" component={modals.WardAbsorbModal} />
            </ModalNav.Group>   

                 {/* TwoHanded Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="BarbarianModal" component={modals.BarbarianModal} />
                <ModalNav.Screen name="ChampionsStanceModal" component={modals.ChampionsStanceModal} />
                <ModalNav.Screen name="CriticalChargeModal" component={modals.CriticalChargeModal} />
                <ModalNav.Screen name="DeepWoundsModal" component={modals.DeepWoundsModal} />
                <ModalNav.Screen name="DevastatingBlowModal" component={modals.DevastatingBlowModal} />
                <ModalNav.Screen name="LimbsplitterModal" component={modals.LimbsplitterModal} />
                <ModalNav.Screen name="SkullCrusherModal" component={modals.SkullCrusherModal} />
                <ModalNav.Screen name="SweepModal" component={modals.SweepModal} />
                <ModalNav.Screen name="WarmasterModal" component={modals.WarmasterModal} />
            </ModalNav.Group>  

                {/* Pickpocket Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="CutpurseModal" component={modals.CutpurseModal} />
                <ModalNav.Screen name="ExtraPocketsModal" component={modals.ExtraPocketsModal} />
                <ModalNav.Screen name="KeymasterModal" component={modals.KeymasterModal} />
                <ModalNav.Screen name="LightFingersModal" component={modals.LightFingersModal} />
                <ModalNav.Screen name="MisdirectionModal" component={modals.MisdirectionModal} />
                <ModalNav.Screen name="NightThiefModal" component={modals.NightThiefModal} />
                <ModalNav.Screen name="PerfectTouchModal" component={modals.PerfectTouchModal} />
                <ModalNav.Screen name="PoisonedModal" component={modals.PoisonedModal} />
            </ModalNav.Group>                              
        </ModalNav.Navigator>
    );
}

function Drawers() {
    const [AllActivePerks, SetAllActivePerks] = useState(0);
    return (
        <AllActivePerkss.Provider value={[AllActivePerks, SetAllActivePerks]}>
            <Drawer.Navigator
                drawerContent={props => <DrawerContent {...props} />}
                initialRouteName='HomeScreen'
                screenOptions={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: 'white',
                    headerTitleAlign: 'center',
                    headerTitle: 'All Active Perks: ' + AllActivePerks,
                    headerRight: () => {
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: 18,
                            }}
                        >{AllActivePerks}</Text>
                    },
                    drawerStyle: {
                        borderColor: 'white',
                        borderWidth: 1,
                        backgroundColor: 'slateblue',
                        width: 225,
                        shadowColor: 'black',
                        borderRadius: 5,

                    }
                }}
            >

                <Drawer.Screen name='BasicSmithingModal ' component={Modal} />

            </Drawer.Navigator>
        </AllActivePerkss.Provider>

    );
}

export default () => (

    <NavigationContainer>
        <Drawers />
    </NavigationContainer>

);

//\Skyrim-Perk-Calculator\node_modules\metro-runtime\src\polyfills\require.js
//commented out lines 111 - 122 for cycle issue (temporary)