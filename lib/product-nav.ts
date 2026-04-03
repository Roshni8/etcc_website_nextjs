export interface ProductNavItem {
  title: string;
  subtitle: string;
  href: string;
}

export interface ProductNavSection {
  label: string;
  items: ProductNavItem[];
}

export const productNavSections: ProductNavSection[] = [
  {
    label: "Transformers",
    items: [
      {
        title: "Toroidal Transformers",
        subtitle: "10VA–3000VA, 50Hz to 10kHz",
        href: "/toroidal-transformer",
      },
      {
        title: "Current Transformers",
        subtitle: "50A–2000A, accuracy class 0.5",
        href: "/current-transformer",
      },
    ],
  },
  {
    label: "Potentiometers",
    items: [
      {
        title: "Linear Potentiometers",
        subtitle: "Precision slide-wire & linear motion types",
        href: "/linear-potentiometer",
      },
      {
        title: "Servo Potentiometers",
        subtitle: "±0.5% linearity, −55°C to +125°C",
        href: "/potentiometer",
      },
    ],
  },
  {
    label: "Resistive Components",
    items: [
      {
        title: "Wire Wound Resistors",
        subtitle: "5W–200W, ceramic & aluminium housed",
        href: "/wirewound-resistor",
      },
      {
        title: "Rheostats",
        subtitle: "Rotary & slider types, 25W–500W",
        href: "/rheostat",
      },
    ],
  },
];
