import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, SectionList, StyleSheet, Text, TextInput, FlatList, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={LoginScreen}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen 
          name='Menu'
          component={MenuScreen}
        /> 
        <Stack.Screen name="MyModal" component={ModalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Welcome!!!</Text>
      <TextInput style={styles.input} placeholder='Username'></TextInput>
      <TextInput style={styles.input} placeholder='Password'></TextInput>
      <Button 
        title='login'
        onPress={() => {
          navigation.replace('HomeTabs')
        }}
      />
      <StatusBar style="auto" />
    </View>
  )
}

const foodItems = [
  { id: '1', name: '3pc Chicken' },
  { id: '2', name: '6pc Chicken' },
  { id: '3', name: 'Burger' },
  { id: '4', name: 'Okinawa' },
  { id: '5', name: 'Taro' },
  { id: '6', name: 'Wintermelon' },
  { id: '7', name: 'Cookies and Cream' },
];

const OrderScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={foodItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.buttonContainer}>
        <Button title="New Order" onPress={() => { /* handle new order */ }} />
        <Button title="Print Receipt" onPress={() => { /* handle print receipt */ }} />
      </View>
    </View>
  );
};

// function OrderScreen() {
//   return (
//     <View style={styles.ordercontainer}>
//       <View style={styles.buttonContainer}>
//         <Button style={styles.button} title="New Order" onPress={() => { /* handle new order */ }} />
//         <Button style={styles.button} title="Print Receipt" onPress={() => { /* handle print receipt */ }} />
//       </View>
//     </View>
//   );
// }

function InventoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Order" component={OrderScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Inventory" component={InventoryScreen} />
    </Tab.Navigator>
  );
}

function ModalScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  );
}

const MenuScreen = ({navigation, route}) => {
  return (
    <View>
      <SectionList 
        sections={[
          {title: 'Meals', data: ['3pc Chicken', '6pc Chicken', 'Burger']},
          {title: 'Drinks', data: ['Okinawa', 'Taro', 'Wintermelon', 'Cookies and Cream']}
        ]}
        renderItem={({item}) => <Text title={item} style={styles.item} onPress={() => navigation.navigate('MyModal')}>{item}</Text>}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeader}>{section.title}</Text>
            <Button title='add item' />
          </View>
          
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  ordercontainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100, // Adjust to provide space for the buttons
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  button: {
    flex: 1, // Ensures the buttons take equal space
    marginHorizontal: 10, // Adds space between buttons
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 5,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
