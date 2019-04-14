import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // container: {
  //   flex: 1
  // },
  pageContainer: {
    backgroundColor: '#4c0a01'
  },
  contentContainer: {
    paddingTop: 40,
    // borderColor: '#4c0a01'
  },
    screenTitleText: {
    fontSize: 30,
    color: '#4c0a01',
    // color: '#fff',
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
  },
  bodyText: {
    fontSize: 15,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  subTitleText: {
    fontSize: 18,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "500",
    padding : 10,
    // paddingRight : 10,
    // paddingTop : 30
  },
  upperSubTitleText: {
    fontSize: 18,
    color: '#4c0a01',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "500",
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop : 30
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalContainer: {
    alignItems: 'center',
    // height: 350,
    marginTop:'40%',
    borderWidth: 2,
    borderColor: '#4c0a01',
    borderRadius: 5,
    padding: 10,
    // backgroundColor: 'rgba(255,255,255, 1)',
    backgroundColor: '#4c0a01',
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  modalTitleText: {
    fontSize: 25,
    color: '#fff',
    lineHeight: 15,
    textAlign: 'center',
    fontWeight: "900",
    padding : 10,
    marginTop : -25
  },
  modalBodyText: {
    fontSize: 15,
    color: 'rgba(240,240,240, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  button:{
    marginHorizontal: 80,
    marginTop:30,
    marginBottom:20,
    paddingTop:35,
    paddingBottom:35,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:'#4c0a01',
    borderRadius:5,
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  buttonText:{
    color:'#fff',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "900",
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  huntButton:{
    marginHorizontal: 50,
    marginTop:15,
    paddingTop:40,
    paddingBottom:40,
    backgroundColor:'#4c0a01',
    borderRadius:5,
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  wideRedButton:{
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#4c0a01',
    borderRadius:5,
    shadowOffset:{ width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  profileImagePlaceholder: {
    backgroundColor: "#B3DDF2",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginVertical: 30
  }
});