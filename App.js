import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MateriasScreen from "./src/screens/MateriasScreen";
import TarefasScreen from "./src/screens/TarefasScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen
          name="Materias"
          component={MateriasScreen}
        />

        <Stack.Screen
          name="Tarefas"
          component={TarefasScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}