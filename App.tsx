import * as Location from 'expo-location';
import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import DayItem from './DayItem';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const API_KEY = 'b6d63069ea5f7e32f85903eb161ce011';

const App = () => {
  const [city, setCity] = useState('Loading...');
  const [days, setDays] = useState<any[]>([]);
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
      const todayData = json.list.filter((v: any, i: number) => i < 8);
      setDays(todayData);
    }
  };
  useEffect(() => {
    ask();
  }, []);
  return (
    <View style={styles.container}>
      {!ok ?
        <View style={{...styles.day, alignItems : "center"}}>
          <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
        </View>
        :
        <>
          <View style={styles.city}>
            <Text style={styles.cityName}>{days && city}</Text>
          </View>
          <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
            {days.length <= 0 ? (
              <View style={{...styles.day, alignItems : "center"}}>
                <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
              </View>
            ) : (
              days.map((day, index) => <DayItem key={day.dt_txt} day={day} dayStyle={styles.day} />)
            )}
          </ScrollView>
        </>
    }
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D5B4B4',
    color : "#fff",
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
    color : "#fff",
  },
  cityName: {
    fontSize: 48,
    fontWeight: '800',
    color : "#fff",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 20,
  },
});
