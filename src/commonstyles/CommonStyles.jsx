import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  mainColor: '#17498F',
  //COLORS
  blueColor: '#2563EB',
  lightColor: '#64748B',
  strokeLines: '#E5E7EB',
  bgColor: '#F8FAFC',
  lightColor2:'#949494',

  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  mb4: {marginBottom: 4},
  mb8: {marginBottom: 8},
  mb12: {marginBottom: 12},
  mb16: {marginBottom: 16},
  mb20: {marginBottom: 20},
  mb24: {marginBottom: 24},
  mb32:{marginBottom:32},

  mt4: {marginTop: 4},
  mt8: {marginTop: 8},
  mt12: {marginTop: 12},
  mt16: {marginTop: 16},
  mt20: {marginTop: 20},
  mt24: {marginTop: 24},

  hr: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
    alignSelf: 'stretch',
  },
  //headings and texts

  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'SF Pro Display',
  },
  heading2: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  label: {
    color: '#18202E',
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
    fontSize: 20,
    fontWeight: '700',
  },
  text1: {
    color: '#64748B',
    textAlign: 'center',
    fontFamily: 'SF Pro Display',
    fontSize: 16,
    fontWeight: '400',
  },
  text2: {
    fontSize: 16,
    color: '#595959',
    fontWeight: '500',
  },
  text3: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
  text4: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000',
  },
  text5: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  text6: {
    fontSize: 16,
    fontWeight: '700',
    color: '#18202E',
  },
  text7: {
    fontSize: 14,
    fontWeight: '400',
    color: '#18202E',
  },
  text8: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },

    //Buttons
    blueButton:{
        width: '100%',
        paddingVertical:12,
        paddingHorizontal:16,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor:'#17498F'
    },
    blueButtonText:{
        color: '#FFF',
        textAlign: 'center',
        fontFamily: "SF Pro Display",
        fontSize: 16,
        fontWeight: 700,
        lineHeight: 18 
    },
    header:{
        color:'#000',
        textAlign:'center',
        fontSize:16,
        fontStyle:'normal',
        fontWeight:'700'
    },
    smallbutton:{
        padding:8,
        justifyContent:'center',
        alignItems:'center',
        gap:8,
        borderRadius:16,
        backgroundColor:'#fff',
        borderColor:'#2563EB',
        width:112,
        borderWidth:1
    },
    smallgreenbutton:{
        padding:8,
        justifyContent:'center',
        alignItems:'center',
        gap:8,
        borderRadius:16,
        backgroundColor:'#2563EB',
        width:112,
    
    },
    smallgreenbuttontext:{
        color:'#fff',
        textAlign:'center',
        fontSize:12,
        fontWeight:'500'
    },
    column2: {
      flexDirection: 'column',
      gap: 8,
    },
    row2: {flexDirection: 'row', gap: 8, alignItems: 'center'},
    row1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor:"gray"
    },
})    
export default commonStyles;
