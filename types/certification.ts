export type CertificationAttachment = {
  url: string;
  type: "pdf" | "image";
};

export type CertificationItem = {
  name: string;
  date: string;
  attachment?: CertificationAttachment;
};
