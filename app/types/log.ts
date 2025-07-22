import type { EntityQuery, EntityResponse } from "~/types/entity";

export interface SystemLogQuery extends EntityQuery {
  type: "ACTIVITY" | "OPERATION";
  requestId: string;
  accountName: string;
  description: string;
  method: string;
  url: string;
  ip: string;
  success: boolean;
}

export interface SystemLogResponse extends EntityResponse<string> {
  id: string;
  requestId: string;
  description: string;
  method: string;
  url: string;
  ip: string;
  mobile: boolean;
  browser: string;
  browserVersion: string;
  browserEngine: string;
  browserEngineVersion: string;
  platform: string;
  os: string;
  osVersion: string;
  startAt: string;
  endAt: string;
  success: boolean;
  parameters: string;
  exceptions: string;
  exceptionCode: string;
  exceptionMessage: string;
  exceptionDetails: string;
  exceptionCause: string;
  duration: string;
  createBy: {
    avatar: string;
    nickname: string;
  };
}

export interface SmsRecordQuery extends EntityQuery {
  tenant: string;
  phone: string;
  signature: string;
  template: string;
  message: string;
  success: boolean;
  createAt: string;
}

export interface SmsRecordResponse extends EntityResponse<string> {
  id: string;
  tenant: string;
  phone: string;
  signature: string;
  template: string;
  content: string;
  message: string;
  success: boolean;
  createAt: string;
}

export interface EmailRecordQuery extends EntityQuery {
  tenant: string;
  email: string;
  subject: string;
  success: boolean;
  createAt: string;
}

export interface EmailRecordResponse extends EntityResponse<string> {
  id: string;
  tenant: string;
  email: string;
  subject: string;
  content: string;
  success: boolean;
  message: string;
  createAt: string;
}
