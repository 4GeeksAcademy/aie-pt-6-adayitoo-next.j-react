import Image from "next/image";

export const HostInfo = ({ host }: { host: { name: string; yearsHosting: number; avatar: string } }) => (
  <div className="host-row">
    <Image className="host-avatar" src={host.avatar} alt={host.name} width={56} height={56} />
    <div>
      <strong>Anfitrion: {host.name}</strong>
      <p>{host.yearsHosting} anos como anfitrion</p>
    </div>
  </div>
);
