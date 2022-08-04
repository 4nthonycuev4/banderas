import useSWR from "swr";
const { useRouter } = require("next/router");

const SingleCountryPage = () => {
  const router = useRouter();
  const name = router.query.name[0].toUpperCase() + router.query.name.slice(1);
  const { data: country, error } = useSWR(`/api/countries/Peru`);
  if (error) return <div>failed to load</div>;
  if (!country) return <div>loading...</div>;
  return <div>hello {country.short}!</div>;
};

export default SingleCountryPage;
