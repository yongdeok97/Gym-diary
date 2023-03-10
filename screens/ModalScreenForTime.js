import React, {useState} from 'react';
import Modal from 'react-native/Libraries/Modal/Modal';
import {Picker} from '@react-native-picker/picker';
import * as M from '../assets/styles/ModalStyle/ModalStyle';

// A modal window to set the contents related to the exercise record
export default function ModalScreenForTime(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(0);
  const [selectedSeconds, setSelectedSeconds] = useState(0);

  const minutes = [];
  const seconds = [];

  for (let i = 0; i < 60; i += 1) {
    seconds.push(i);
    if (i < 6) minutes.push(i);
  }

  return (
    <M.Container>
      <M.Button onPress={() => setShowModal(true)}>
        <M.ButtonText>Set Time</M.ButtonText>
      </M.Button>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <M.ModalContainer>
          <M.ModalContent>
            <M.ModalSubContent>
              <M.PickerContainer>
                <M.TimeText>Minutes:</M.TimeText>
                <Picker
                  selectedValue={selectedMinutes}
                  onValueChange={itemValue => setSelectedMinutes(itemValue)}
                  onRequestClose={() => {
                    setModalVisible(false);
                  }}>
                  {minutes.map(minute => (
                    <Picker.Item
                      key={minute}
                      label={minute.toString()}
                      value={minute}
                    />
                  ))}
                </Picker>
              </M.PickerContainer>
              <M.PickerContainer>
                <M.TimeText>Seconds:</M.TimeText>
                <Picker
                  selectedValue={selectedSeconds}
                  onValueChange={itemValue => setSelectedSeconds(itemValue)}>
                  {seconds.map(second => (
                    <Picker.Item
                      key={second}
                      label={second.toString()}
                      value={second}
                    />
                  ))}
                </Picker>
              </M.PickerContainer>
            </M.ModalSubContent>
            <M.Button
              onPress={() => {
                props.onValueChange(selectedMinutes * 60 + selectedSeconds);
                setShowModal(false);
              }}>
              <M.ButtonText>Done</M.ButtonText>
            </M.Button>
          </M.ModalContent>
        </M.ModalContainer>
      </Modal>
    </M.Container>
  );
}
