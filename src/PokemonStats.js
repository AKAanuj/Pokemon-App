import React from 'react';
import axios from 'axios';
import {Dimensions,View,StyleSheet,TouchableOpacity,FlatList,AsyncStorage,Image,Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class PokemonStats extends React.Component
{
    constructor(props){
      super(props);
      this.name=props.navigation.getParam('name',"NA");
      this.id=this.props.navigation.getParam('id',"NA");
      this.stats=this.props.navigation.getParam('stats',"NA");
      this.sprite=this.props.navigation.getParam('sprite',"NA");
      this.height=this.props.navigation.getParam('height',"NA");
      this.weight=this.props.navigation.getParam('weight',"NA");
      this.types=this.props.navigation.getParam('types',"NA");
      this.state={
        fav:false,
      }
    }
    UNSAFE_componentWillMount()
    {
      try {
          const isfav= AsyncStorage.getItem('Favorite'+this.name)
            .then(value=>
            {
              console.log(JSON.parse(value));
              if(value){
                this.setState({
                  fav:value,
                });
              }
            }).catch(error=>
              {
              console.log(error);
            });
    }
    catch(error)
    {
      console.log(error);
    }
  }
    createTypeFields(){
      return this.types.map((item)=>
        <Text key={item.type.name} style={styles.pokemonTypeStyle}>{item.type.name}</Text>
      )
    }
    storePokemonData=async (name,value)=>
    {
      try{
        await AsyncStorage.setItem(name,value,()=>{console.log('stored');});
      }catch(error)
      {
        console.log(error);
      }
    }
    removePokemonData=async (name)=>
    {
      try{
        await AsyncStorage.removeItem(name,()=>{
          console.log('removed');
        });
      }
      catch(error)
      {
        console.log(error);
      }
    }
    setFav()
    {
      this.setState((previousState,currentProps)=>{
        return {fav:!previousState.fav}
      },()=>{
      if(this.state.fav)
      {
        this.storePokemonData("Favorite"+this.name,JSON.stringify(this.state.fav));
      }
      else {
        this.removePokemonData("Favorite"+this.name);
      }
    });
    }
    render()
    {
      return (
        <View style={{backgroundColor:'black',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
        <View style={styles.pokemonStyle}>
        <Image style={styles.pokemonImageStyle} source={{uri:this.sprite}} />
        </View>

        <TouchableOpacity style={{position:'absolute',top:10,right:10}} onPress={()=>this.setFav()}>
        <Icon name={this.state.fav?"heart":"heart-outline"} size={32} color={this.state.fav?"red":"black"}></Icon>
        </TouchableOpacity>

        <View style={{alignItems:'center'}}>
        <Text style={{color:'white',fontSize:20,marginVertical:10}}>{this.name}</Text>

        <View style={{alignItems:"center",flexDirection:'row'}}>
          {this.createTypeFields()}
        </View>

        <View style={{flexDirection:'row'}}>

          <View style={{margin:20,alignItems:"center"}}><Text style={{color:"white",fontSize:16}}>{this.weight} KG</Text><Text style={{color:"white",fontSize:10}}>weight</Text></View>

          <View style={{margin:20,alignItems:"center"}}><Text style={{color:"white",fontSize:16}}>{this.height/10} M</Text><Text style={{color:"white",fontSize:10}}>height</Text></View>

        </View>
        </View>

        </View>
      );
    }
}
const styles=StyleSheet.create(
  {
    pokemonStyle:
    {
      alignItems:'center',
      justifyContent:'center',
      borderBottomLeftRadius:40,
      borderBottomRightRadius:40,
      borderWidth:2,
      backgroundColor:'white',
      width:Dimensions.get('window').width,
      height:'40%',
    },
    pokemonImageStyle:
    {
      width:'60%',
      height:'60%',
    },
    pokemonTypeStyle:{
      padding:10,
      marginHorizontal:10,
      backgroundColor:"rgb(80,80,150)",
      borderRadius:10,
      color:"white",
      fontSize:16,
    }
  }
)
export default PokemonStats;
