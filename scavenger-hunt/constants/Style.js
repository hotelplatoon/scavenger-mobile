import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  homeClueScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  takephotocontainer: {
    flex: 1,
    alignItems: 'center',
    margin:20,
    paddingTop: 30,
  },
  galleryContainer: {
    paddingTop: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  pageContainer: {
    backgroundColor: '#4c0a01',
    paddingTop: 20,
  },
  contentContainer: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 50,
  },  
  overlayContainer: {
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  overlayMessage: {
    marginVertical: 20,
    alignItems: 'center',
  },
  screenTitleText: {
    fontSize: 30,
    color: '#4c0a01',
    lineHeight: 40,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
  },
  pageTitleText: {
    fontSize: 30,
    color: '#fff',
    lineHeight: 30,
    textAlign: 'center',
    fontWeight: "900",
    paddingLeft : 10,
    paddingRight : 10,
    paddingTop: 15,
    paddingBottom: 15
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
    paddingBottom: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalContainer: {
    alignItems: 'center',
    marginTop:'40%',
    borderWidth: 2,
    borderColor: '#4c0a01',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#4c0a01',
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  modalTitleText: {
    fontSize: 25,
    color: '#fff',
    lineHeight: 30,
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
  buttonTextLight:{
    color:'#fff',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "300",
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
  wideButtonText:{
    color:'#fff',
    fontSize: 20,
    fontWeight: "700",
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
  profileImagePlaceholder: {
    backgroundColor: "#4c0a01",
    // borderColor: '#4c0a01',
    // borderWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  smallOutlineButton:{
    marginHorizontal: -20,
    marginTop:30,
    marginBottom:-10,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#fff',
    borderRadius:5,
    shadowOffset:{ width: 2, height: 2 },
    shadowColor: 'black',
    shadowOpacity: 0.7,
  },
  textContainer: {
    marginHorizontal: 30,
    backgroundColor: '#fff',
  },
});