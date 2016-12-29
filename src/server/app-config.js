/**
 * Created by Amg on 2016/12/27.
 */
import { Cookie } from '../ultils/tools';


export default class AppConfig {

  static systemType = () => Cookie.getCookie('systemType');

}
