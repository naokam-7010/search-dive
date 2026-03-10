import { Type } from "@google/genai";

export type SearchEngine = 'google' | 'yahoo' | 'bing';
export type Device = 'pc' | 'sp';
export type JobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface KeywordData {
  id: string;
  query: string;
  category: string;
  avgVolume: number;
  recentVolume: number;
  volumeHistory: number[]; // Last 12 months
  yearlyHistory: { year: number; volume: number }[]; // Last 5 years
  rank: number | '圏外';
  prevRank?: number | '圏外';
  serpFeatures: string[];
  lp: string;
  title: string;
  domain: string;
  topDomains: { domain: string; share: number }[];
  updatedAt: string;
}

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  count: number;
  engine: SearchEngine;
  device: Device;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  domain: string;
  keywordCount: number;
  engine: SearchEngine;
  status: 'active' | 'archived';
  updatedAt: string;
  avgRank: number;
  top10Rate: number;
  top30Rate: number;
  totalImp: number;
  prevTotalImp: number;
}

export interface ExportRecord {
  id: string;
  filename: string;
  format: 'csv' | 'xlsx';
  count: number;
  condition: string;
  createdAt: string;
  status: 'completed' | 'failed';
}
