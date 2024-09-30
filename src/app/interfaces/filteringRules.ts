export interface FilteringRule {
  id: string;
  action: string;
  url: string;
  type: string;
  reason?: string;
  userIP?: string;
}
