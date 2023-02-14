// import { useState } from 'react';
// import { RNCamera } from 'react-native-camera';
// import { TouchableOpacity } from 'react-native';
//
// export const QRScanner = () => {
//     const [scanning, setScanning] = useState(false);
//
//     const onQRCodeRead = (e) => {
//         console.log(e.data);
//         setScanning(false);
//     };
//
//     return (
//         <View style={{ flex: 1 }}>
//             {scanning && (
//                 <RNCamera
//                     style={{ flex: 1 }}
//                     onBarCodeRead={onQRCodeRead}
//                     type={RNCamera.Constants.Type.back}
//                     flashMode={RNCamera.Constants.FlashMode.off}
//                     androidCameraPermissionOptions={{
//                         title: 'Permission to use camera',
//                         message: 'We need your permission to use your camera',
//                         buttonPositive: 'Ok',
//                         buttonNegative: 'Cancel',
//                     }}
//                 />
//             )}
//             {!scanning && (
//                 <TouchableOpacity onPress={() => setScanning(true)}>
//                     <Text>Start Scanning</Text>
//                 </TouchableOpacity>
//             )}
//         </View>
//     );
// };