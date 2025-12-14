import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { registerUser } from '../serverReqs';

export default function RegisterUI({navigation}) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        setError('');
        if (!name.trim()){
            return setError('Name is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError('Email is invalid');
        }
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            return setError('Password must be at least 8 characters long and include uppercase, lowercase letters and a number');
        }
        const res = await registerUser(name, email, password);
        if (res.error) {
            return setError(res.error);
        }
        if (res.success) {
            setSuccess(res.success);
            setTimeout(() => {
                navigation.replace('Login');
            }, 2000);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName}/>
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry/>
            <Button title="Register" onPress={handleRegister}/>
            {success ? <Text style={styles.success}>{success}</Text> : null}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    input: {borderWidth: 2, borderColor: 'black', padding: 10, marginBottom: 10},
    error: {color: 'red', marginBottom: 10, textAlign: 'center'},
    success: {color: 'green', marginBottom: 10, textAlign: 'center'},
});
