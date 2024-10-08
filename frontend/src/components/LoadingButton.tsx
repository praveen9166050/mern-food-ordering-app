import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

function LoadingButton() {
  return (
    <Button disabled className="h-4 w-4 mr-2 animate-spin">
      <Loader2 />
      Loading
    </Button>
  )
}

export default LoadingButton;