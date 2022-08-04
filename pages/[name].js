import useSWR from "swr";
const { useRouter } = require("next/router");

const SingleCountryPage = () => {
  const router = useRouter();
  const { data: country, error } = useSWR(`/api/countries/Peru`);
  if (error) return <div>failed to load</div>;
  if (!country) return <div>loading...</div>;
  return <div>hello {country.short}!</div>;
};

export default SingleCountryPage;
