import { DNSRecord } from "../model/record.model";
import { ICreateRecords } from "../interface/createRecords.interface";

export class CreateRecords {
  public records: DNSRecord[] = [];
  public target: string;
  public destination: string;
  public usePath: boolean;
  public isHttps: boolean;

  constructor(args: ICreateRecords) {
    const isHttps = args.destination.substr(0, 8) === "https://";
    const host = args.target.split(".")[0];

    const destination =
      args.destination
        .substr(7 + (isHttps ? 1 : 0))
        .replace(/[^\w\s\.\/\-\_!?]/g, "");

    const value = `${
      destination
        .split("/")
        .filter(a => a)
        .join(".opts-slash.")
      }${
      isHttps
        ? ".opts-https"
        : ""
      }${
      args.usePath
        ? ".opts-uri"
        : ""
      }.redirect.center`;

    this.records.push(new DNSRecord({
      type: "CNAME",
      host,
      value,
    }));

    this.target = args.target;
    this.destination = args.destination;
    this.usePath = args.usePath;
    this.isHttps = isHttps;
  }
}
