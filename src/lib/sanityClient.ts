import { createClient } from "next-sanity";

//import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  token: process.env.SANITY_ACCESS_Tocken,
  apiVersion: "v2023-06-27",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
});
