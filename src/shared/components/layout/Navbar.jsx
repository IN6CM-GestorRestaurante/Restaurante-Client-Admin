import imgLogo from "../../../assets/img/Cafeteria.png";
import { AvatarUser } from "../ui/AvatarUser";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/75 shadow-[0_10px_30px_-24px_rgba(80,62,43,0.6)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <img
            src={imgLogo}
            alt="Restaurante logo"
            className="h-9 w-9 rounded-lg border border-stone-200 object-cover md:h-10 md:w-10"
          />

          <h1 className="text-base font-bold text-[var(--primary-red)] sm:text-lg">
            Restaurante Admin
          </h1>
        </div>

        <AvatarUser />
      </div>
    </nav>
  );
};
