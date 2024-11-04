

export interface Analysis {
  index: number;
  question: string;
  answer?: string;
  ctime: string; // or Date, depending on your preference
}

export interface Website {
  index: number;
  website_url: string;
  website_preview?: string;
  questions?: string[]; // Optional
  ctime: string; // or Date
  mtime: string; // or Date
  // server model defined as array, but for optimization for redux, we use object in frontend
  analyses: { [key: number]: Analysis }; // Related analyses as a plain object
}
