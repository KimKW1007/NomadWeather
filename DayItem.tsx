import React, { useEffect } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import { weatherType } from "./weatherType";
import { Fontisto } from '@expo/vector-icons';



const DayItem = ({day, dayStyle} : any) => {
  const dayDate = Number(day.dt_txt.split(' ')[0].split('-').at(-1));
  let dayTime = Number(day.dt_txt.split(' ')[1].split(':')[0]) + 9;
  const newDayTime = dayTime >= 24 ? dayTime - 24 : dayTime;
  const newDayDate = dayTime >= 24 ? dayDate + 1 : dayDate;
  return (
    <View style={dayStyle}>
      <View>
        <Text style={styles.dayDate}>{newDayDate < 10 ? `0${newDayDate}` : newDayDate}일</Text>
        <Text style={styles.dayTime}>{newDayTime < 10 ? `0${newDayTime}` : newDayTime}H</Text>
      </View>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.temp}>{parseFloat(day.main.temp).toFixed(1)}</Text>
        {/* <Image source={{uri : `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}} style={{width: 120, height : 120}}/> */}
        <Fontisto name={weatherType[day.weather[0].main].icon} size={60} color='white' />
      </View>
      <Text style={styles.description}>{weatherType[day.weather[0].main].text}</Text>
      <Text style={styles.tinyText}>{day.weather[0].description}</Text>
    </View>
  );
};

export default DayItem;

const styles = StyleSheet.create({
  temp: {
    fontSize: 100,
    fontWeight: "600",
    letterSpacing: -3,
    color : "#fff",
  },
  description: {
    fontSize: 36,
    color : "#fff",
  },
  dayDate: {
    fontSize: 20,
    textAlign : "center",
    marginBottom: 50,
    color : "#fff"

  },
  dayTime: {
    fontSize: 24,
    alignItems: 'center',
    color : "#fff",
  },
  tinyText: {
    fontSize: 20,
    color : "#fff",
  },
});
