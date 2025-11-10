import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { registerUser } from '../serverReqs';

export default function RegisterUI({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        const res = await registerUser(name, email, password);
        if (res.success) {
            navigation.replace('Login');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <Button title="Register" onPress={handleRegister}/>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    input: {borderWidth: 2, borderColor: 'black', padding: 10, marginBottom: 10},
    error: {color: 'red', marginBottom: 10, textAlign: 'center'},
});
