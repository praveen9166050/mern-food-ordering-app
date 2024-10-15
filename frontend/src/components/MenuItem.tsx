import { MenuItem as MenuItemType } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType,
  addToCart: () => void
}

function MenuItem({menuItem, addToCart}: Props) {
  return (
    <Card className="cursor-pointer" onClick={addToCart}>
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