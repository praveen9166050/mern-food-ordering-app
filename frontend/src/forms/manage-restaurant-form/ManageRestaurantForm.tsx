import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  restaurantName: z.string({required_error: "Restaurant name is required"}),
  city: z.string({required_error: "City is required"}),
  country: z.string({required_error: "Country is required"}),
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Derivery price must be a number"
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated delivery time is required",
    invalid_type_error: "Estimated derivery time must be a number"
  }),
  cuisines: z.array(z.string()).nonempty({message: "Please select atleast one item"}),
  menuItems: z.array(z.object({
    name: z.string({required_error: "Name is required"}).min(1, "Name is required"),
    price: z.coerce.number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number"
    }).min(1, "Price is required")
  })),
  imageFile: z.instanceof(File, {message: "Image is required"})
});

type Restaurantformdata = z.infer<typeof formSchema>;

type Props = {
  onSave: (restaurantFormdata: FormData) => void,
  isLoading: boolean
}

function ManageRestaurantForm({onSave, isLoading}: Props) {
  const form = useForm<Restaurantformdata>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{name: "", price: 0}]
    }
  });

  const onSubmit = (formDataJson: Restaurantformdata) => {

  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}

export default ManageRestaurantForm;