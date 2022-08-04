import FaunaClient from "fauna";

const CountriesAPIHandler = async (req, res) => {
  try {
    const client = new FaunaClient();
    if (req.method === "GET") {
      const { name } = req.query;
      const data = await client.getSingleCountry(name);
      res.status(200).json(data);
    } else if (req.method === "POST") {
      const data = req.body;
      await client.addCountry(data);
      res.status(200).send("ok");
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json(err);
  }
};

export default CountriesAPIHandler;
