export class DNSRecord {
  type: "CNAME" | "A";
  host: string;
  value: string;

  constructor(init?: DNSRecord) {
    Object.assign(this, init);
  }
}