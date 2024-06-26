import { Categories } from "shared-types";

export const categories: { id: Categories; name: string; icon: string }[] = [
  {
    id: "games",
    name: "Jogos",
    icon: "/icons/rocket.svg",
  },
  {
    id: "health",
    name: "Saúde",
    icon: "/icons/heart.svg",
  },
  {
    id: "music",
    name: "Música",
    icon: "/icons/headphones.svg",
  },
  {
    id: "fix",
    name: "Reforma",
    icon: "/icons/home.svg",
  },
  {
    id: "emergency",
    name: "Emergência",
    icon: "/icons/life-buoy.svg",
  },
  {
    id: "hospital",
    name: "Hospitalar",
    icon: "/icons/activity.svg",
  },
];
