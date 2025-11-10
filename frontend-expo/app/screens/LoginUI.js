import React, {useState} from "react";
import {View, TextInput, Button, Text, StyleSheet} from "react-native";
import {loginUser} from '../serverReqs'

export default function LoginUI({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await loginUser(email, password);
        if (res.token) {
            navigation.replace('Products');
        } else {
            setError(res.error || 'Login failed');
        }
};
return (
    <View style={styles.container}>
        <Text style ={styles.title}>Login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
        <Button title="Login" onPress={handleLogin}/>
        <Text onPress ={() => navigation.navigate('Register')}>c
            Create account
        </Text>
    </View>
);
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    input: {borderWidth: 2, borderColor: 'black', padding: 10, marginBottom: 10},
    error: {color: 'red', marginBottom: 10, textAlign: 'center'},
});
