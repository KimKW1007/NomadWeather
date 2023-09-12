import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = 'b6d63069ea5f7e32f85903eb161ce011';

const App = () => {
  const [city, setCity] = useState('Loading...');
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    if (location[0].region) setCity(location[0].region);
    const json = await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)).json();
    if (json) {
      const date = new Date();
      const todayData = json.list.filter((v : any, i : number) => i < 8);
      const moreDayData = json.list.filter(({dt_txt} : {dt_txt :string}) => dt_txt.includes("00:00:00")).slice(1,3);
      const currentDays = [todayData, moreDayData].flat()
      setDays([]);
      console.log(date)
    }
  };
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF8551'
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 48,
    fontWeight: '800'
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  temp: {
    fontSize: 168,
    marginTop: 50
  },
  description: {
    marginTop: -30,
    fontSize: 50
  }
});
