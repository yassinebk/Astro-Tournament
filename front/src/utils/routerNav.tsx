import { useRouter } from "next/dist/client/router";

export const replaceRouterLastPath = (current: string, next: string) => {
  const router = useRouter();
  return router.asPath.replace(current, next);
};
