import logo from "@/assets/voicebridge-logo.png";
import { cn } from "@/lib/utils";

interface VoiceBridgeLogoProps {
  size?: number;
  className?: string;
}

const VoiceBridgeLogo = ({ size = 36, className = "" }: VoiceBridgeLogoProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <img
        src={logo}
        alt="VoiceBridge"
        width={size}
        height={size}
        className="rounded-xl object-contain drop-shadow-md transition-all duration-300 group-hover:drop-shadow-xl"
      />
      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default VoiceBridgeLogo;
