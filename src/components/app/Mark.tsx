import Image from "next/image";
import { APP_NAME } from "@/config";

/** The small logo used on login, onboarding and the first call screen. */
export function Mark({ size = 24 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/brand/svg/checkin-icon.svg"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
      />
      <span className="font-serif text-[20px] font-medium lowercase">{APP_NAME}</span>
    </span>
  );
}
