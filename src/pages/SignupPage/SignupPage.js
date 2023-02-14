import { StyleSheet, ScrollView, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';

export const SignupPage = () => {

    const { email, password } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    // const [userData, setUserData] = useState({
    //     email: '',
    //     password: '',
    // })

    // const handleRegisterPress = (e) => {
    //     e.preventDefault()
    //
    //     const url = `http://10.0.2.2:5000/api/auth/signup`
    //     fetch(url, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email, password }),
    //     })
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error(`Response ended with status ${res.status}`)
    //             }
    //             return res.json()
    //         })
    //         .then(data => {
    //             console.log('Success:', data);
    //             navigate('/signin')
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }

    // const handleDataChange = (name) => (value) => {
    //     dispatch(setCredentials(
    //         {
    //             [name]: value,
    //         },
    //     ))
    //
    //     // setUserData(prev => ({ ...prev, [name]: value }))
    // }

    const theme = useTheme()

    const s = StyleSheet.create({

    })

    return(
        <View style={s.signupPage}>
            <ScrollView>
                <View style={s.container}>
                    <Text theme={theme}>Register page</Text>
                </View>
            </ScrollView>
        </View>
    )
    // return (
    //     <View style={s.signupPage}>
    //         <View style={s.container}>
    //             <Link to={'/'}><Text>Go home</Text></Link>
    //             <View style={s.signupBody}>
    //                 <Text style={s.signupHeader}>Sign Up</Text>
    //                 <TextInput value={email} onChangeText={handleDataChange('email')} style={s.input}
    //                            placeholder={'Email'}/>
    //                 <TextInput value={password} onChangeText={handleDataChange('password')}
    //                            secureTextEntry={true} style={s.input} placeholder={'Password'}/>
    //                 <TouchableOpacity style={s.submitButton} onPress={handleRegisterPress}>
    //                     <Text style={s.submitButtonText}>Submit</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </View>
    //     </View>
    // )
}
