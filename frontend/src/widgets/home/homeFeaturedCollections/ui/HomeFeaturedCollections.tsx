import { Container } from "@/shared/ui";
import { homeFeaturedCollections } from "../model/constants";
import { HomeFeaturedCollectionCard } from "./HomeFeaturedCollectionCard";

export const HomeFeaturedCollections = () => {
  return (
    <Container className="tablet:py-20 mobile:py-16 py-28">
      <div className="tablet:grid-cols-1 mobile:grid-cols-1 grid w-full grid-cols-2 gap-6">
        {homeFeaturedCollections.map((collection) => (
          <HomeFeaturedCollectionCard
            key={collection.id}
            collection={collection}
          />
        ))}
      </div>
    </Container>
  );
};
