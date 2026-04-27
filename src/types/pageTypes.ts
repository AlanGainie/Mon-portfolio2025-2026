import { JSX } from "react";

export type PageType = "user" | "admin";

export type DisplaysInf = {
  displayFirstMenuIndex: number;
  displaySecondMenuIndex: number;
};

export type DownloadItem = {
  label: string;
  href: string;
  download?: boolean;
  isAvailable?: boolean;
};

export type SummaryLink = {
  id: string;
  label: string;
};

export type CvItem = {
  title: string;
  imageKey: string;
  alt: string;
  description: string;
  downloads: DownloadItem[];
};

export type ExamResource = {
  title: string;
  description: string;
  pdf?: string;
  slides?: string;
  imageKey: string;
  folder?: string;
  image?: string;
  isPdfAvailable?: boolean;
  isSlidesAvailable?: boolean;
  isFolderAvailable?: boolean;
};

export type AdministrativeContent = {
  description?: string;
  pdf?: string;
  slides?: string;
  image?: string;
  folder?: string;
};

export type PageData = {
  hero: {
    eyebrow: string;
    title: string;
    text: string;
    typewriterText: string;
  };

  videoIntro?: {
    thumbnailKey: string;
    videoUrl: string;
    sectionEyebrow: string;
    sectionTitle: string;
    paragraphs: string[];
    todoTitle: string;
    todoText: string;
  };

  summaryLinks?: SummaryLink[];

  profile?: {
    eyebrow: string;
    title: string;
    subtitle: string;
    identityPictureKey: string;
    identityLegend: string;
    terminalImageKey: string;
    whoAmITitle: string;
    whoAmIText: string;
    skillsTitle: string;
    skillsText: string;
    goalsTitle: string;
    goalsText: string;
    hookTitle: string;
    hookText: string;
  };

  cvSection?: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };

  cvs?: CvItem[];

  examSection?: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };

  examResources?: ExamResource[];
};

export type PageProps = {
  header?: JSX.Element | "none";
  footer?: JSX.Element | "none";
  content?: JSX.Element;
  tab_menue1?: number;
  tab_menue2?: number;
  displaysInf?: DisplaysInf;
  type?: PageType;
  pageDataFile?: string;
  enableAnchors?: boolean;
};