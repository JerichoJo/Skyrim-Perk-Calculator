import * as React from 'react';
import Modal from 'react-native-modal';


{/* MODAL POPUP */ }
<Modal
    animationType="slide"
    transparent
    backdropColor="black"
    onBackdropPress={() => {
        setIsModalVisible(this.state.modal);
    }}
    visible={isModalVisible}>
    <View
        style={{
            backgroundColor: 'firebrick',
            margin: 5,
            alignSelf: 'auto',

            justifyContent: 'center',
            padding: 30,
            borderRadius: 8,
            borderWidth: 2,
        }}>
        <Text>Skill: blah blah</Text>
        <Text>Skill: more skill blah</Text>
        {/* +/- BUTTONS*/}
        <View style={{ flexDirection: 'row' }}>
            <View>
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        padding: 10,
                    }}
                    onPress={() => {
                        setCount(count + 1);
                    }}>
                    <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Text style={{ padding: 10 }}>{count}</Text>
            <View>
                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-start',
                        padding: 10,
                    }}
                    onPress={() => {
                        setCount(count - 1);
                    }}>
                    <AntDesign name="minus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>