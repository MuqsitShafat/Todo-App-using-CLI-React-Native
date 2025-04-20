import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Analogue_Clock = () => {
  const [time, setTime] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: String(now.getHours()).padStart(2, '0'),
        minutes: String(now.getMinutes()).padStart(2, '0'),
        seconds: String(now.getSeconds()).padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.digitalClock}>
        <Text style={styles.timeText}>{time.hours}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.timeText}>{time.minutes}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.timeText}>{time.seconds}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitalClock: {
    flexDirection: 'row',
    backgroundColor: '#000',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  timeText: {
    color: '#0f0',
    fontSize: 40,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  separator: {
    color: '#0f0',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Analogue_Clock;
