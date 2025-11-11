import { Boxes, ChartColumnBig, PackageOpen, User } from "lucide-react";
import { EIconNames } from "../enums/icon-names.enum";

export default function AppIcons({iconName}: {iconName: EIconNames}) {
  switch (iconName) {
    case EIconNames.SUPPLIERS:
      return (<Boxes/>);
    case EIconNames.CUSTOMERS:
      return (<User/>);
    case EIconNames.PRODUCTS:
      return (<PackageOpen/>);
    case EIconNames.SALES:
      return (<Boxes/>);
    case EIconNames.DASHBOARD:
      return (<ChartColumnBig/>);
    default:
      return (<Boxes/>);
  }
}