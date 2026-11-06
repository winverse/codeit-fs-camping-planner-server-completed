import { z } from "zod";

export const goCampingItemSchema = z.object({
  contentId: z.string(),
  facltNm: z.string(),
  lineIntro: z.string(),
  doNm: z.string(),
  sigunguNm: z.string(),
  addr1: z.string(),
  induty: z.string(),
  sbrsCl: z.string(),
  animalCmgCl: z.string(),
  firstImageUrl: z.string(),
});

export const goCampingResponseSchema = z.object({
  response: z.object({
    body: z.object({
      items: z.object({
        item: z.array(goCampingItemSchema),
      }),
    }),
  }),
});

export type GoCampingItem = z.infer<typeof goCampingItemSchema>;
