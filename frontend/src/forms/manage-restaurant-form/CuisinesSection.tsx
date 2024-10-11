import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisines } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

function CuisinesSection() {
  const {control} = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>Select the cuisines that your restaurant serves</FormDescription>
      </div>
      <FormField 
        control={control} 
        name="cuisines" 
        render={({field}) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {cuisines.map((cuisine, i) => <CuisineCheckbox key={i} cuisine={cuisine} field={field} />)}
            </div>
            <FormMessage />
          </FormItem>
        )} 
      />
    </div>
  );
}

export default CuisinesSection;