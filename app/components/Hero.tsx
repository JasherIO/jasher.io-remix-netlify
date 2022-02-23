import { useState, useEffect } from "react";
import { Link } from "remix";
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";
import { site } from "~/util/site";

export default function Hero() {
  const cloud = new Cloudinary({
    cloud: {
      cloudName: "jasher",
    }
  });

  const [width, setWidth] = useState(1920);
  useEffect(() => { setWidth(document.documentElement.clientWidth) }, [width]);

  console.log(width);
  const retro_gaming_image = cloud.image("retro_gaming").format("webp").quality("auto").resize(scale().width(width));

  return (
    <section className="w-full mx-auto">
      <div className="relative shadow-xl">
        <div className="absolute inset-0">
          <AdvancedImage 
            cldImg={retro_gaming_image} 
            plugins={[responsive(), placeholder({ mode: "vectorize" })]}
            className="h-full w-full object-cover grayscale" 
            alt="Retro Gaming"
            width="1920"
            height="1280"  
          />

          <div className="absolute inset-0 bg-green-500 dark:bg-green-900 mix-blend-multiply backdrop-blur-sm" />
        </div>
        <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-40 lg:px-8">
          <h1 className="max-w-lg mx-auto text-center text-white text-4xl font-extrabold font-display tracking-tight sm:text-5xl lg:text-6xl">
            Hi, I'm Josh!
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-center text-xl text-green-200 sm:max-w-3xl">
            {site.description}
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
              <Link
                to="/contact"
                prefetch="intent"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-green-700 bg-neutral-100 hover:bg-green-50 sm:px-8"
              >
                Contact
              </Link>
              <Link
                to="/projects"
                prefetch="intent"
                className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-green-100 bg-green-700 bg-opacity-80 hover:bg-opacity-90 dark:bg-green-500 dark:bg-opacity-50 dark:hover:bg-opacity-60 sm:px-8"
              >
                Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}