const categoryImageByName: Record<string, string> = {
  Armchairs: "/images/home/armchair.jpg",
  Chairs: "/images/home/chair.jpeg",
  Decor: "/images/home/decor.jpg",
  Sofas: "/images/home/sofa.jpg",
  Tables: "/images/home/table.jpeg",
};

export const getHomeCategoryImage = (name: string) => {
  return categoryImageByName[name] ?? "/images/home/chair.jpeg";
};
