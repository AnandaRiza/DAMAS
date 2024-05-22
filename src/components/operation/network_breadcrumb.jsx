// components/Breadcrumb.js

import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment !== '');

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        {pathSegments.map((segment, index) => (
          <li key={index} className="breadcrumb-item">
            <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
              <a>{segment}</a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
