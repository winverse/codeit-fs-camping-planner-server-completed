import type { CampsiteData } from "#prisma/models.js";
import type { GoCampingItem } from "#schemas";

export function toCampsiteData(item: GoCampingItem): CampsiteData {
  return {
    contentId: item.contentId,
    name: item.facltNm,
    intro: item.lineIntro,
    region: item.doNm,
    city: item.sigunguNm,
    address: item.addr1,
    industries: item.induty,
    facilities: item.sbrsCl,
    petAllowed: item.animalCmgCl.startsWith("가능"),
    imageUrl: item.firstImageUrl === "" ? null : item.firstImageUrl,
  };
}
