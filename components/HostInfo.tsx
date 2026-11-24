import { Host } from "@/types";

interface HostInfoProps {
  host: Host;
}

export default function HostInfo({ host }: HostInfoProps) {
  return (
    <div className="flex items-center gap-3">
      {/* Avatar placeholder */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-200 text-lg font-bold text-rose-800">
        {host.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-semibold text-amber-950">Hosted by {host.name}</p>
        <p className="text-sm text-amber-600">
          {host.yearsHosting} {host.yearsHosting === 1 ? "year" : "years"} hosting
        </p>
      </div>
    </div>
  );
}