import Section from "~/components/Layout/Section";
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

const projects = [
  {
    name: "RLCS 21-22",
    role: "Referee and Statistician",
    href: "/projects/rlcs-21-22",
    cloudinary_id: "rlcs_21_22",
    start_date: "",
    end_date: "",
    src: "/RLCS_21_22.jpg"
  },
  {
    name: "DreamHack Beyond Boost Cup",
    role: "Referee",
    href: "/projects/dreamhack-beyond-boost-cup",
    cloudinary_id: "dreamhack_beyond_boost_cup_21",
    start_date: "",
    end_date: "",
    src: "/Dreamhack_Beyond_Boost_Cup_21.jpg"
  },
  {
    name: "RLCS X",
    role: "Referee and Statistician",
    href: "/projects/rlcs-x",
    cloudinary_id: "rlcs_x",
    start_date: "",
    end_date: "",
    src: "/RLCS_X.jpg"
  },
];

export default function FeaturedProjects() {
  const size = { width: 500, height: 250 };
  const cloud = new Cloudinary({
    cloud: {
      cloudName: "jasher",
    }
  });

  return (
    <Section>
      <p className="text-center text-sm sm:text-base font-semibold uppercase text-neutral-500 tracking-wide">
        Featured Projects
      </p>

      <ul role="list" className="mt-4 lg:mt-6 flex flex-wrap justify-center space-y-10 lg:justify-between lg:space-y-0">
        {projects.map((project) => (
          <li key={project.name} className="relative">
            <div className="group block w-72 lg:w-80 aspect-w-16 aspect-h-9 rounded-lg bg-neutral-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-100 focus-within:ring-green-500 overflow-hidden">
              {/* <img src={project.src} alt={project.name} className="object-cover pointer-events-none group-hover:opacity-75" /> */}
              
              <AdvancedImage 
                cldImg={cloud.image(project.cloudinary_id).format("webp").quality("auto").resize(scale().width(size.width))} 
                plugins={[responsive(), placeholder({ mode: "vectorize" })]}
                className="object-cover pointer-events-none group-hover:opacity-75" 
                alt="Retro Gaming"
                width="1920"
                height="1280"  
              />

              <button type="button" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View details for {project.name}</span>
              </button>
            </div>
            <p className="mt-2 block text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate pointer-events-none">{project.name}</p>
            <p className="block text-sm font-medium text-neutral-500 pointer-events-none">{project.role}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}