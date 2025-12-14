declare module 'react-native-html-to-pdf' {
  interface HtmlToPdfOptions {
    html: string;
    fileName?: string;
    directory?: string;
    base64?: boolean;
  }

  interface HtmlToPdfResult {
    filePath: string;
  }

  const convert: (options: HtmlToPdfOptions) => Promise<HtmlToPdfResult>;

  export = { convert };
}
