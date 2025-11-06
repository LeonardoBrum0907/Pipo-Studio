import { HomeContent, CtaContent } from "./types";

export interface PagesContentsRepository {
   findHomeContent(): Promise<HomeContent | null>;
   findCtaContent(): Promise<CtaContent | null>;
}