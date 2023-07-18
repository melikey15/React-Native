import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SwipeListView } from 'react-native-swipe-list-view';

const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/simpsons');
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderListItem = (item) => (
    <TouchableOpacity
      style={{ padding: 16, backgroundColor: 'white' }}
      onPress={() => navigateToDetail(item)}
    >
      <Text>{item.name}</Text>
      
    </TouchableOpacity>
  );

  const renderHiddenItem = (data, rowMap) => (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', padding: 16 }}>
      <Text
        style={{ color: 'white', backgroundColor: 'red', paddingHorizontal: 16, paddingVertical: 8, marginRight: 8 }}
        onPress={() => deleteItem(data.item.id)}
      >
      Delete
      </Text>
    </View>
  );

  const onSwipeValueChange = swipeData => {
    const { key, value } = swipeData;
    if (value < -120) {
      deleteItem(key);
    }
  };

  const deleteItem = async (key) => {
    try {
      await axios.delete(`https://5fc9346b2af77700165ae514.mockapi.io/simpsons/${key}`);
      const updatedData = data.filter(item => item.id !== key);
      setData(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToDetail = (item) => {
    navigation.navigate('Detail', { item });
  };

  return (
    <SwipeListView
      data={data}
      renderItem={({ item }) => renderListItem(item)}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableRightSwipe={true}
      onSwipeValueChange={onSwipeValueChange}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ListScreen;
