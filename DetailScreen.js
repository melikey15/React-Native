import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      const response = await axios.get(`https://5fc9346b2af77700165ae514.mockapi.io/simpsons/${item.id}`);
      setDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {detail ? (
        <View>
          <Image
    source={{ uri: detail.avatar }}
            style={styles.image}
          />
          <Text style={styles.text}> {detail.name}</Text>
  
    <Text style={styles.text}> {detail.job}</Text>
          <Text style={styles.text}> {detail.description}</Text>

        </View>) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  image: {
    width: 90,
    height: 210,
    marginBottom: 16,
    borderRadius: 8,
    marginLeft:120,
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
});

export default DetailScreen;
