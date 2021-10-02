import Accessories from "../Screens/Accessories";
import BottomTab from "./BottomTab";
import MyDrawer from "./MyDrawer";
import EditProfile from "../Screens/EditProfile";
import PrivacyPolicy from "../Screens/PrivacyPolicy";
import LegalInfo from "../Screens/LegalInfo";
import FindaDoctor from "../Screens/FindaDoctor";
import ProdDetails from "../Screens/ProdDetails";
import Cart from "../Screens/Cart";

const Stack = createStackNavigator();
const PrivateNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Bottom" component={BottomTab} />
      <Stack.Screen name="Accessories" component={Accessories} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Privacy" component={PrivacyPolicy} />
      <Stack.Screen name="LegalInfo" component={LegalInfo} />
      <Stack.Screen name="FindaDoc" component={FindaDoctor} />
      <Stack.Screen name="ProdDetails" component={ProdDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
};

export default PrivateNavigator;
