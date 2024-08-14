import { BrowserRouter} from "react-router-dom";

import RootPublic from "./Public";
import RootPrivate from "./Private";

export const Root = () => {
  return (
    <BrowserRouter>
     <RootPublic/>
     <RootPrivate/>
    </BrowserRouter>
  );
};

export default Root;
