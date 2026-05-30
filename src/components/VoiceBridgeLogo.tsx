import { cn } from "@/lib/utils";

interface VoiceBridgeLogoProps {
  size?: number;
  className?: string;
}

const VoiceBridgeLogo = ({ size = 36, className }: VoiceBridgeLogoProps) => {
  return (
    <img
      src="/voicebridge-logo.png"
      alt="VoiceBridge Logo"
      width={size}
      height={size}
      className={cn(
        "object-contain shrink-0 transition-all duration-300",
        className,
      )}
      loading="eager"
    />
  );
};

export default VoiceBridgeLogo;
