import type { LoaderFunction } from "remix";
import { 
  imageLoader, 
  MemoryCache,   
  fsResolver,
  fetchResolver,
  Resolver 
} from "remix-image/server";
import { sharpTransformer } from "~/utilities/sharp_transformer";

export const fetchImage: Resolver = async (asset, url, options, basePath) => {
  if (url.startsWith("/") && (url.length === 1 || url[1] !== "/")) {
    return fsResolver(asset, url, options, basePath);
  } else {
    return fetchResolver(asset, url, options, basePath);
  }
};

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
  // transformer: sharpTransformer,
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};