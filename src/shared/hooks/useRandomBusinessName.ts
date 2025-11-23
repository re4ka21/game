import { BUSINESS_NAMES_BY_CATEGORY } from "@/entities";

export function useRandomBusinessName(businessName: string) {
  const getBaseCategory = (fullName: string) => fullName.split(" (")[0];

  const generateRandomName = () => {
    const baseCategory = getBaseCategory(businessName);
    const names = BUSINESS_NAMES_BY_CATEGORY[baseCategory] || ["My Business"];
    return names[Math.floor(Math.random() * names.length)];
  };

  return (currentName: string) => {
    const random = generateRandomName();
    const isNetwork = currentName.includes("(");
    if (isNetwork) {
      const suffix = currentName.match(/\((.*?)\)/)?.[0] || "";
      return `${random} ${suffix}`;
    } else {
      return random;
    }
  };
}
