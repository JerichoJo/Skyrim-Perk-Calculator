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

            {/* TwoHanded Tree Modals  -- <ModalNav.Screen name="CriticalChargeModal" component={modals.CriticalChargeModal} /> */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="BarbarianModal" component={modals.BarbarianModal} />
                <ModalNav.Screen name="ChampionsStanceModal" component={modals.ChampionsStanceModal} />

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

            {/* Heavy Armor Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="JuggernautModal" component={modals.JuggernautModal} />
                <ModalNav.Screen name="FistsOfSteelModal" component={modals.FistsOfSteelModal} />
                <ModalNav.Screen name="CushionedModal" component={modals.CushionedModal} />
                <ModalNav.Screen name="ConditioningModal" component={modals.ConditioningModal} />
                <ModalNav.Screen name="WellFittedModal" component={modals.WellFittedModal} />
                <ModalNav.Screen name="TowerOfStrengthModal" component={modals.TowerOfStrengthModal} />
                <ModalNav.Screen name="HeavyMatchingSetModal" component={modals.HeavyMatchingSetModal} />
                <ModalNav.Screen name="ReflectBlowsModal" component={modals.ReflectBlowsModal} />
            </ModalNav.Group>

            {/* Conjuration Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="NoviceConjurationModal" component={modals.NoviceConjurationModal} />
                <ModalNav.Screen name="ConjurationDualCastingModal" component={modals.ConjurationDualCastingModal} />
                <ModalNav.Screen name="SummonerModal" component={modals.SummonerModal} />
                <ModalNav.Screen name="AtromancyModal" component={modals.AtromancyModal} />
                <ModalNav.Screen name="ElementalPotencyModal" component={modals.ElementalPotencyModal} />
                <ModalNav.Screen name="TwinSoulsModal" component={modals.TwinSoulsModal} />
                <ModalNav.Screen name="NecromancyModal" component={modals.NecromancyModal} />
                <ModalNav.Screen name="MysticBindingModal" component={modals.MysticBindingModal} />
                <ModalNav.Screen name="SoulStealerModal" component={modals.SoulStealerModal} />
                <ModalNav.Screen name="OblivionBindingModal" component={modals.OblivionBindingModal} />
                <ModalNav.Screen name="ApprenticeConjurationModal" component={modals.ApprenticeConjurationModal} />
                <ModalNav.Screen name="AdeptConjurationModal" component={modals.AdeptConjurationModal} />
                <ModalNav.Screen name="ExpertConjurationModal" component={modals.ExpertConjurationModal} />
                <ModalNav.Screen name="MasterConjurationModal" component={modals.MasterConjurationModal} />
                <ModalNav.Screen name="DarkSoulsModal" component={modals.DarkSoulsModal} />
            </ModalNav.Group>

            {/* Enchanting Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="CorpusEnchanterModal" component={modals.CorpusEnchanterModal} />
                <ModalNav.Screen name="EnchanterModal" component={modals.EnchanterModal} />
                <ModalNav.Screen name="ExtraEffectModal" component={modals.ExtraEffectModal} />
                <ModalNav.Screen name="FireEnchanterModal" component={modals.FireEnchanterModal} />
                <ModalNav.Screen name="FrostEnchanterModal" component={modals.FrostEnchanterModal} />
                <ModalNav.Screen name="InsightfulEnchanterModal" component={modals.InsightfulEnchanterModal} />
                <ModalNav.Screen name="SoulSiphonModal" component={modals.SoulSiphonModal} />
                <ModalNav.Screen name="SoulSqueezerModal" component={modals.SoulSqueezerModal} />
                <ModalNav.Screen name="StormEnchanterModal" component={modals.StormEnchanterModal} />
            </ModalNav.Group>

            {/* Alchemist Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="AlchemistModal" component={modals.AlchemistModal} />
                <ModalNav.Screen name="BenefactorModal" component={modals.BenefactorModal} />
                <ModalNav.Screen name="ConcentratedPoisonModal" component={modals.ConcentratedPoisonModal} />
                <ModalNav.Screen name="ExperimenterModal" component={modals.ExperimenterModal} />
                <ModalNav.Screen name="GreenThumbModal" component={modals.GreenThumbModal} />
                <ModalNav.Screen name="PhysicianModal" component={modals.PhysicianModal} />
                <ModalNav.Screen name="PrisonerModal" component={modals.PrisonerModal} />
                <ModalNav.Screen name="PurityModal" component={modals.PurityModal} />
                <ModalNav.Screen name="SnakebloodModal" component={modals.SnakebloodModal} />
            </ModalNav.Group>

            {/* Sneak Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="AssasinsBladeModal" component={modals.AssasinsBladeModal} />
                <ModalNav.Screen name="BackstabModal" component={modals.BackstabModal} />
                <ModalNav.Screen name="DeadlyAimModal" component={modals.DeadlyAimModal} />
                <ModalNav.Screen name="LightFootModal" component={modals.LightFootModal} />
                <ModalNav.Screen name="MuffledMovementModal" component={modals.MuffledMovementModal} />
                <ModalNav.Screen name="ShadowWarriorModal" component={modals.ShadowWarriorModal} />
                <ModalNav.Screen name="SilenceModal" component={modals.SilenceModal} />
                <ModalNav.Screen name="SilentRollModal" component={modals.SilentRollModal} />
                <ModalNav.Screen name="StealthModal" component={modals.StealthModal} />
            </ModalNav.Group>

            {/* Block Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="BlockRunnerModal" component={modals.BlockRunnerModal} />
                <ModalNav.Screen name="DeadlyBashModal" component={modals.DeadlyBashModal} />
                <ModalNav.Screen name="DeflectArrowsModal" component={modals.DeflectArrowsModal} />
                <ModalNav.Screen name="DisarmingBashModal" component={modals.DisarmingBashModal} />
                <ModalNav.Screen name="ElementalProtectionModal" component={modals.ElementalProtectionModal} />
                <ModalNav.Screen name="PowerBashModal" component={modals.PowerBashModal} />
                <ModalNav.Screen name="QuickReflexesModal" component={modals.QuickReflexesModal} />
                <ModalNav.Screen name="ShieldChargeModal" component={modals.ShieldChargeModal} />
                <ModalNav.Screen name="ShieldWallModal" component={modals.ShieldWallModal} />
            </ModalNav.Group>

            {/* Destruction Tree Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="AdeptDestructionModal" component={modals.AdeptDestructionModal} />
                <ModalNav.Screen name="ApprenticeDestructionModal" component={modals.ApprenticeDestructionModal} />
                <ModalNav.Screen name="AugmentedFlamesModal" component={modals.AugmentedFlamesModal} />
                <ModalNav.Screen name="AugmentedFrostModal" component={modals.AugmentedFrostModal} />
                <ModalNav.Screen name="AugmentedShockModal" component={modals.AugmentedShockModal} />
                <ModalNav.Screen name="DeepFreezeModal" component={modals.DeepFreezeModal} />
                <ModalNav.Screen name="DestructionDualCastingModal" component={modals.DestructionDualCastingModal} />
                <ModalNav.Screen name="DisintegrateModal" component={modals.DisintegrateModal} />
                <ModalNav.Screen name="ExpertDestructionModal" component={modals.ExpertDestructionModal} />
                <ModalNav.Screen name="ImpactModal" component={modals.ImpactModal} />
                <ModalNav.Screen name="IntenseFlamesModal" component={modals.IntenseFlamesModal} />
                <ModalNav.Screen name="MasterDestructionModal" component={modals.MasterDestructionModal} />
                <ModalNav.Screen name="NoviceDestructionModal" component={modals.NoviceDestructionModal} />
                <ModalNav.Screen name="RuneMasterModal" component={modals.RuneMasterModal} />
            </ModalNav.Group>

            {/* One Handed Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="ArmsmanModal" component={modals.ArmsmanModal} />
                <ModalNav.Screen name="BladesmanModal" component={modals.BladesmanModal} />
                <ModalNav.Screen name="BoneBreakerModal" component={modals.BoneBreakerModal} />
                <ModalNav.Screen name="CriticalChargeModal" component={modals.CriticalChargeModal} />
                <ModalNav.Screen name="DualFlurryModal" component={modals.DualFlurryModal} />
                <ModalNav.Screen name="DualSavageryModal" component={modals.DualSavageryModal} />
                <ModalNav.Screen name="FightingStanceModal" component={modals.FightingStanceModal} />
                <ModalNav.Screen name="HackAndSlashModal" component={modals.HackAndSlashModal} />
                <ModalNav.Screen name="ParalyzingStrikeModal" component={modals.ParalyzingStrikeModal} />
                <ModalNav.Screen name="SavageStrikeModal" component={modals.SavageStrikeModal} />
            </ModalNav.Group>

            {/* Lockpicking Modals */}
            <ModalNav.Group screenOptions={{ presentation: "transparentModal" }} >
                <ModalNav.Screen name="AdeptLocksModal" component={modals.AdeptLocksModal} />
                <ModalNav.Screen name="ApprenticeLocksModal" component={modals.ApprenticeLocksModal} />
                <ModalNav.Screen name="ExpertLocksModal" component={modals.ExpertLocksModal} />
                <ModalNav.Screen name="GoldenTouchModal" component={modals.GoldenTouchModal} />
                <ModalNav.Screen name="LocksmithModal" component={modals.LocksmithModal} />
                <ModalNav.Screen name="MasterLocksModal" component={modals.MasterLocksModal} />
                <ModalNav.Screen name="NoviceLocksModal" component={modals.NoviceLocksModal} />
                <ModalNav.Screen name="QuickHandsModal" component={modals.QuickHandsModal} />
                <ModalNav.Screen name="TreasureHunterModal" component={modals.TreasureHunterModal} />
                <ModalNav.Screen name="UnbreakableModal" component={modals.UnbreakableModal} />
                <ModalNav.Screen name="WaxKeyModal" component={modals.WaxKeyModal} />
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