import React, {useState} from 'react';
import {Alert, Text} from 'react-native';
import {signUp} from '../assets/components/Auth';
import * as LM from '../assets/styles/LMStyle/LMStyle';

// Member registration error message
const resultMessages = {
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
};

// membership screen for membership registration

export default function MemberShipScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Checkpassword, setCheckPassword] = useState('');

  // signup function
  const signUpSubmit = async () => {
    if (password !== Checkpassword) {
      Alert.alert('비밀번호를 확인해 주세요');
      return false;
    }
    const info = {email, password};
    try {
      const {user} = await signUp(info);
      props.navigation.goBack();
    } catch (e) {
      const alertMessage = resultMessages[e.code]
        ? resultMessages[e.code]
        : '알 수 없는 이유로 회원가입에 실패하였습니다.';
      Alert.alert('회원가입 실패', alertMessage);
    }
  };

  return (
    <LM.Container>
      <Text style={{color: '#171999', fontSize: 20}}>Make Account</Text>
      <LM.Input
        placeholder="email"
        placeholderTextColor="#171999"
        value={email}
        onChangeText={setEmail}
      />
      <LM.Input
        placeholder="Password"
        placeholderTextColor="#171999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <LM.Input
        placeholder="Password Check"
        placeholderTextColor="#171999"
        value={Checkpassword}
        onChangeText={setCheckPassword}
        secureTextEntry
      />
      <LM.ButtonContainer>
        <LM.Button
          onPress={() => {
            signUpSubmit(), setEmail(''), setPassword(''), setCheckPassword('');
          }}>
          <LM.ButtonLabel>confirm</LM.ButtonLabel>
        </LM.Button>
      </LM.ButtonContainer>
    </LM.Container>
  );
};

