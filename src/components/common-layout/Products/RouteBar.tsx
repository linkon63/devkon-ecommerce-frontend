import Link from "next/link";

type TRoute = {
  slug: string;
  title: string;
};

type TProps = {
  routes: TRoute[] | [];
};

export default function RouteBar({ routes }: TProps) {
  return (
    <nav className="text-sm text-darkGray py-4 border-b border-coral mb-10">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className=" hover:underline">
            Home
          </Link>
        </li>
        {routes.map((path: TRoute, index) => {
          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              <Link href={path?.slug} className=" hover:underline">
                {path?.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
