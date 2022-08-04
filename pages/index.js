import Head from "next/head";
import Image from "next/future/image";
import useSWRInfinite from "swr/infinite";
import Link from "next/link";

export default function Home() {
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.data) return null;
    if (pageIndex === 0) return "/api/countries";
    return `/api/countries?afterId=${previousPageData.afterId}`;
  };
  const { data } = useSWRInfinite(getKey);

  const countries =
    data && data[0].data
      ? [].concat(...data?.map((page) => [].concat(...page?.data)))
      : [];

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>My App</title>
        <meta name="description" content="By Anthony Cueva" />
      </Head>

      <main className="flex flex-col w-1/2 items-center space-y-2">
        <h1 className="font-bold text-3xl">Países</h1>

        <p className="">CRUD simple</p>

        <div className="grid grid-cols-2 gap-4">
          {countries &&
            countries.length > 0 &&
            countries.map((country) => (
              <a
                key={country.id}
                href={`https://en.wikipedia.org/wiki/${country.name}`}
                className="w-96 h-60 rounded border flex flex-col items-center"
              >
                <h1 className="font-bold text-3xl">
                  {country.name}{" "}
                  <span className="text-sm font-normal">({country.short})</span>
                  &rarr;
                </h1>
                <Image
                  src={country.flag}
                  width={200}
                  height={200}
                  className="rounded"
                  alt={country.name + " flag"}
                />
                <p className="text-md">Nacionalidad: {country.nationality}</p>
                <div className="flex space-x-2">
                  {country.colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 border rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </a>
            ))}
        </div>
        <div>
          <Link href="/add">
            <a>
              <button className="hover:bg-red-600 hover:text-white px-4 py-1 rounded border-2 border-red-600 font-bold">
                Añadir país
              </button>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
