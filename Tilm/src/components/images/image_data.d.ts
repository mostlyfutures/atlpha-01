interface ImageData {
  id: number | string;
  title: string;
  author: string;
  description: string;
  url: { small: string; large: string };
  dimensions: { width: number; height: number };
}

declare const images: ImageData[];
export default images; 