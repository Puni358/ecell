import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const EventCard = ({ event }: { event: any }) => {
  const eventSlug = event.title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return (
    <Link
      to={`/events/${eventSlug}`}
      className="bg-black group cursor-pointer border-r border-b border-white/5 transition-all duration-500 hover:bg-zinc-900/40 flex flex-col h-[550px] no-underline"
    >
      <div className="relative w-full h-64 overflow-hidden border-b border-white/5">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
        />
      </div>

      <div className="p-8 flex flex-col justify-between flex-grow relative overflow-hidden">
        <div>
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-3xl font-bold tracking-tighter leading-tight text-white group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <div className="p-2 rounded-full border border-white/10 group-hover:border-primary group-hover:bg-primary transition-all duration-300">
              <ArrowRight
                className="text-zinc-600 group-hover:text-black"
                size={20}
              />
            </div>
          </div>

          <p className="text-zinc-600 text-xs line-clamp-2 font-normal leading-relaxed mb-6">
            {event.description}
          </p>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-wrap gap-6">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            <Calendar size={12} className="text-primary" />
            {event.date}
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
            <MapPin size={12} className="text-primary" />
            {event.venue}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
