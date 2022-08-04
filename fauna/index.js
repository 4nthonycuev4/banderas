import { Client, query } from "faunadb";
import ParseFaunaObj from "./parse";

const {
  Collection,
  Paginate,
  Map,
  Get,
  Lambda,
  Var,
  Documents,
  Create,
  Ref,
  Match,
  Index,
} = query;

class FaunaClient {
  constructor() {
    this.client = new Client({
      secret: process.env.FAUNADB_SECRET,
      domain: process.env.FAUNADB_DOMAIN,
    });
  }

  async getCountries() {
    return this.client
      .query(
        Map(
          Paginate(Documents(Collection("countries")), {
            size: 10,
            after: Ref(Collection("countries"), "338258318158987336"),
          }),
          Lambda(["ref"], Get(Var("ref")))
        )
      )
      .then((res) => ParseFaunaObj(res));
  }

  async getSingleCountry(name) {
    return this.client
      .query(Get(Match(Index("country_by_name"), [name])))
      .then((res) => ParseFaunaObj(res));
  }

  async addCountry(data) {
    const name = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();
    const short = data.short.slice(0, 2).toUpperCase();
    const nationality =
      data.nationality[0].toUpperCase() + data.nationality.slice(1);
    const flag = data.flag;
    const colors = data.colors
      .toLowerCase()
      .replace(/^[,\s]+|[,\s]+$/g, "")
      .split(",");

    return this.client.query(
      Create(Collection("countries"), {
        data: {
          name,
          short,
          nationality,
          flag,
          colors,
        },
      })
    );
  }
}

export default FaunaClient;
