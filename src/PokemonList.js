import React from 'react';
import axios from 'axios';
import {Dimensions,ActivityIndicator,View,StyleSheet,TouchableOpacity,FlatList,Image,Text} from 'react-native';

class PokemonList extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      refresh:false,
      pokemonDetails:[],
      loading:false,
    }
    this.limit=20;
    this.offset=0;
    this.pokemonData=[];
  }

  getPokemonDetails(pokemonData)
  {
    this.setState({
      loading:true,
    })
    axios({
      method:"GET",
      url:pokemonData.url
    }).then(response=>{
      let data=response.data;
      pokemonData.sprite=data.sprites.front_default;
      pokemonData.stats=data.stats;
      pokemonData.id=data.id;
      pokemonData.height=data.height;
      pokemonData.width=data.weight;
      pokemonData.types=data.types;
      this.pokemonData.push(pokemonData);
      this.setState({
        pokemonDetails:this.pokemonData,
      });
      this.setState({
        loading:false,
      })
    }).catch(error=>{
      console.log(error);
      this.setState({
        loading:false,
      })
    })
  }

  getPokemonList()
  {
    const response=axios({
    method:"GET",
    url:"https://pokeapi.co/api/v2/pokemon/",
    params:{
      offset:this.offset,
      limit:this.limit,
    }
  })
  .then(response=>{
        for(let i=0;i<this.limit;i++)
        {
          let pokemonData={};
          pokemonData.name=response.data.results[i].name;
          pokemonData.url=response.data.results[i].url;
          this.getPokemonDetails(pokemonData);
        }
    })
    .catch(error=>
    {
      console.log(error);
    });
  }

  UNSAFE_componentWillMount()
  {
    this.getPokemonList();
  }

  handleLoadMore(){
    this.offset+=this.limit;
    this.getPokemonList();
  }
  getData()
  {
    return this.state.pokemonDetails;
  }
  getFooter()
  {
    if(!this.state.loading)return null;
    return (
      <ActivityIndicator color="black"/>
    );
  }
  render(){
    return (
      <View style={styles.pokemonListStyle}>
      <FlatList
      numColumns={2}
      data={this.getData()}
      showsVerticalScrollIndicators={false}
      onEndReached={()=>this.handleLoadMore()}
      onEndReachedThreshold={5}
      ListFooterComponent={this.getFooter()}
      renderItem={item=>
        <TouchableOpacity style={styles.pokemonCardStyle} onPress={()=>this.props.navigation.navigate('PokemonStats',{height:item.item.height,types:item.item.types,weight:item.item.weight,id:item.id,sprite:item.item.sprite,stats:item.item.stats,name:item.item.name})}>
          <Image source={{uri:item.item.sprite}} style={styles.pokemonImageStyle}/>
          <Text>{item.item.name}</Text>
        </TouchableOpacity>
      }
      keyExtractor={item=>item.name}
      />
      </View>
    );
  }
}
const styles=StyleSheet.create(
  {
    pokemonListStyle:
    {
      flex:1,
      height:Dimensions.get('window').height,
      width:Dimensions.get('window').width,
      backgroundColor:'white',
    },
    pokemonCardStyle:
    {
      alignItems:'center',
      borderWidth:2,
      borderRadius:20,
      width:'45%',
      height:150,
      marginVertical:10,
      marginHorizontal:10
    },
    pokemonImageStyle:{
      width:'80%',
      height:'80%',
    }
  }
);
export default PokemonList;
