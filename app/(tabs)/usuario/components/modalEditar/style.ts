import { Colors } from "@/constants/Colors"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: 'white',
        height: 'auto',
        width: 350,
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },      
    title: {
        fontFamily: 'PoppinsMedium',
        fontSize: 20, 
        marginBottom: 15,
        textAlign: 'center',   
    },
    input: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.background,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        width: 300,
        marginBottom: 15,
    },
    text: {
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
    }

})