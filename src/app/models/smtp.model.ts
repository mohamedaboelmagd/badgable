export interface ISmtpRequestItem {
  orgId: string;
  badgeName: string;
  badgePhoto;
  recipientName: string;
  email: string;
  url: string;
}

export interface ISmtpRequestItems {
  items: ISmtpRequest[];
}

export interface ISmtpRequest {
  request: string; // JSON.stringify(ISmtpRequestItems)
}
