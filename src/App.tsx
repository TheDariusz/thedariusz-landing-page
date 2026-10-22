import { MotionConfig } from "motion/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";

const App = () => (
  <MotionConfig reducedMotion="user">
    <TooltipProvider>
      <Toaster />
      <Index />
    </TooltipProvider>
  </MotionConfig>
);

export default App;
