import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

function ImageSection() {
  const {control} = useFormContext();
  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Image</h2>
        <FormDescription>
          Add an image that willbe displayed on your restaurant listing in the search results. 
          Adding a new image will overwrite the existing one.
        </FormDescription>
      </div>
      <div className="flex flex-col gap-8 w-[50%]">
        <FormField 
          control={control} 
          name="imageFile" 
          render={({field}) => (
            <FormItem>
              <FormControl>
                <Input 
                  type="file" 
                  accept=".jpg, .jpeg, .png" 
                  onChange={e => field.onChange(e.target.files ? e.target.files[0] : null)}
                  className="bg-white" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} 
        />
      </div>
    </div>
  );
}

export default ImageSection;