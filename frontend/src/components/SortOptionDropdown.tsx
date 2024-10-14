import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void,
  sortOption: string
}

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch"
  },
  {
    label: "Delivery price",
    value: "deliveryPrice"
  },
  {
    label: "Estimated delivery time",
    value: "estimatedDeliveryTime"
  }
]

function SortOptionDropdown({onChange, sortOption}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Button variant={"outline"} className="w-full">
          Sorted by: {SORT_OPTIONS.find(option => option.value === sortOption)?.label || SORT_OPTIONS[0].label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {SORT_OPTIONS.map(option => (
          <DropdownMenuItem className="cursor-pointer" onClick={() => onChange(option.value)}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SortOptionDropdown;