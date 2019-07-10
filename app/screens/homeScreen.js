import React from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, TouchableHighlight } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        var navigation = this.props.navigation;
        this.state = {

            cities: [
                {
                    name: "Nairobi",
                    country: "Kenya"
                },
                {
                    name: "Arusha",
                    country: "Tanzania"
                },
                {
                    name: "Kigali",
                    country: "Rwanda"
                },
                {
                    name: "Bujumbura",
                    country: "Burundi"
                },
                {
                    name: "Algiers",
                    country: "Algeria"
                },
                {
                    name: "Kampala",
                    country: "Uganda"
                },
                {
                    name: "Mogadishu",
                    country: "Somalia"
                },
                {
                    name: "Cairo",
                    country: "Egypt"
                },
                {
                    name: "Niamey",
                    country: "Niger"
                },
                {
                    name: "Accra",
                    country: "Ghana"
                },
                {
                    name: "Abuja",
                    country: "Nigeria"
                },
                {
                    name: "Maseru",
                    country: "Lesotho"
                },
                {
                    name: "Gaberone",
                    country: "Botswana"
                },
                {
                    name: "Juba",
                    country: "South Sudan"
                },
                {
                    name: "Lusaka",
                    country: "Zambia"
                },
                {
                    name: "Khartoum",
                    country: "Sudan"
                },
                {
                    name: "Conakry",
                    country: "Guinea"
                },
                {
                    name: "Addis Ababa",
                    country: "Ethiopia"
                },
                {
                    name: "Bamako",
                    country: "Mali"
                },
                {
                    name: "Bissau",
                    country: "Guinea Bissau"
                },
                {
                    name: "Dakar",
                    country: "Senegal"
                },
                {
                    name: "Libreville",
                    country: "Gabon"
                },
                {
                    name: "Luanda",
                    country: "Angola"
                },
                {
                    name: "Malabo",
                    country: "Equatorial Guinea"
                },
                {
                    name: "Rabat",
                    country: "Morocco"
                }
            ],

            list: [],
            refresh: true,
            newAlert: 0

        }

        // this.fetchCityTemp('London','UK');
        //var list=this.getRandom(this.state.cities,5);
        // console.log(list)

        this.fetchTemps();
    }

    getRandom = (arr, n) => {
        var result = new Array(n),
            len = arr.length,
            taken = new Array(len);
        while (n--) {
            var x = Math.floor(Math.random() * len);
            result[n] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    fetchTemps = () => {
        var newList = [];

        var list = this.getRandom(this.state.cities, 7);
        for (city in list) {
            var name = list[city].name;
            var country = list[city].country;
            this.fetchCityTemp(name, country, newList);
        }
    }

    fetchCityTemp = (city, country, newList) => {

        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=f4b58c091d7b89deb9eecc00ab6f2146&units=metric')
            .then((response) => response.json())
            .then((responseJson) => {
                var r = responseJson.main;
                var obj = responseJson;
                var city = {
                    name: obj.name,
                    country: country,
                    temp: Math.ceil(r.temp),
                    type: obj.weather[0].main,
                    desc: 'Humidity: '+r.humidity+"% - "+obj.weather[0].main
                };

                newList.push(city);
                console.log(this.state.list);

                this.setState({
                    list: newList,
                    refresh: false
                })

                console.log(this.state.list);
            })
    }

    loadNewTemps = () => {
        this.setState({
            list: [],
            refresh: true
        })

        this.fetchTemps();
    }

    getTempRange = (t) => {
        if (t < 11) {
            return 1;
        }
        if (t > 10 && t < 20) {
            return 2;
        }
        if (t >= 20 && t < 30) {
            return 3;
        }
        if (t >= 30) {
            return 4;
        }

    }

    getEmoji = (type) => {
        
        if( type == 'Clouds'){
            return '☁️';
        }
        if(type == 'Clear'){
            return '🌞';
        }
        
        if(type == 'Haze'){
            return '⛅';
        }
        if(type == 'Thunderstorm'){
            return '🌩️'
        }
        if(type == 'Rain'){
            return '☔'
        }
        if(type == 'Snow'){
            return '⛄'
        }
        if(type == 'Mist'){
            return '💭'
        }
        if(type == 'Drizzle'){
            return '🤷'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle='light-content' />
                <Text style={{ width: '100%', paddingTop: 40, paddingBottom: 15, backgroundColor: 'black', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>🔆 African City Weather </Text>
                <FlatList
                    style={{ width: '100%' }}
                    data={this.state.list}
                    refreshing={this.state.refresh}
                    onRefresh={this.loadNewTemps}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableHighlight
                            underlayColor= "white"
                            onPress = { () => this.setState({newAlert: 1,alertMsg: item.desc}) }
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0)']}
                                start={[0, 0.5]}
                            >
                                <View style={styles.row}>
                                    <Text style={[
                                        (this.getTempRange(item.temp) == 1) ? styles.cold : styles.temp,
                                        (this.getTempRange(item.temp) == 2) ? styles.medium : styles.temp,
                                        (this.getTempRange(item.temp) == 3) ? styles.hot : styles.temp,
                                        (this.getTempRange(item.temp) == 4) ? styles.vhot : styles.temp,

                                        styles.cityTemp]}>{this.getEmoji(item.type)} {item.temp}°C</Text>
                                    <Text style={styles.cityName}>{item.name}</Text>
                                </View>
                            </LinearGradient>
                        </TouchableHighlight>
                    )}
                />
                                              
                {
                    this.state.newAlert== 1 ? (

                        <View style={{flex:1, justifyContent: 'center',backgroundColor:'rgba(0,0,0,0.05)', alignItems: 'center',position: 'absolute' , top:0,left: 0, height:'100%',width: '100%'}}>
                            <View style={{width: '75%', height: 90}}>

                                <LinearGradient
                                    style={{
                                        padding:5,
                                        shadowColor:'black', shadowOffset:{ width:0, height:2},shadowOpacity: 0.3,shadowRadius: 2,
                                        justifyContent: 'space-between', flex:1, borderRadius: 20}}
                                    colors={['#136a8a','#267871']}
                                     start={[0,0.65]}
                                >
                                     <Text style={{fontSize:16, color: 'white', padding:10,textAlign: 'center'}}>{this.state.alertMsg}</Text>

                                     <TouchableHighlight
                                        underlayColor='white'
                                        onPress={ () => this.setState({newAlert:0, alertMsg: ''})}
                                     >
                                        <Text style={{fontWeight: 'bold',color:'white', padding: 10, textAlign: 'center'}}>Close</Text>
                                        </TouchableHighlight>
                                </LinearGradient>
                            </View>
                        </View>
                    ) : <View>
                             <Text></Text>
                        </View>
                }
            

            </View>
        )
    }
}

const styles = StyleSheet.create({
    cold: { color: 'blue' },
    medium: { color: 'green' },
    hot: { color: 'orange' },
    vhot: { color: 'red' },
    cityTemp: {
        fontSize: 30,
        lineHeight: 40,
        width: 130,
        marginRight: 15,
        fontWeight: 'bold'
    },
    cityName: {
        fontSize: 20,
        lineHeight: 40

    },
    row: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
}
)