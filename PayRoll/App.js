import NavigationContainer from '@react-navigation/native';
import {LoginPage} from './src/screens/LoginPage';
import {createStackNavigator} from '@react-navigation/stack';
import { Dashboard } from './src/screens/Dashboard';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        // options={{
        //   title: 'FUEL EXPENSE CALCULATOR',
        //   headerStyle: {
        //     backgroundColor: '#21b12a',
        //     height: 70,
        //   },
        //   headerTintColor: '#fff',
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //     fontSize: 23,
        //   },
        // }}
      />
    </NavigationContainer>
  );
};
export default App;
