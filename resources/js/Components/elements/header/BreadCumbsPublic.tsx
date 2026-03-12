import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { Link } from '@inertiajs/react';
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const BreadCumbsPublic = (props: { routes: any }) => {
  return (
      <nav className="mx-auto flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          {props.routes.map(
            (
              route: {
                name: string;
                hasArrow: boolean;
                link: string;
              },
              index: any
            ) => (
              <li key={index}>
                <div className="flex">
                  {route.hasArrow && (
                    <ChevronRightIcon
                      className="h-5 w-5 flex-shrink-0 text-white"
                      aria-hidden="true"
                    />
                  )}
                  <Link
                    href={route.link}
                    className={classNames(
                      route.hasArrow ? 'ml-4' : '',
                      'text-sm font-medium text-white hover:text-gray-100'
                    )}
                  >
                    {route.name}
                  </Link>
                </div>
              </li>
            )
          )}
        </ol>
      </nav>
  );
};
export default BreadCumbsPublic;
