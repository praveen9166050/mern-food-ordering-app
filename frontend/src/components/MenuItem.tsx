import { MenuItem as MenuItemType } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
}

function MenuItem({menuItem}: Props) {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        &#8377; {menuItem.price}
      </CardContent>
    </Card>
  );
}

export default MenuItem