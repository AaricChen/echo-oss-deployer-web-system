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
  exception: string;
  exceptions: string;
  duration: string;
  createBy: {
    avatar: string;
    nickname: string;
  };
}
