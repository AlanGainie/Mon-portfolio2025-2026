import { FileText, Presentation } from 'lucide-react';

export type ExamResource = {
  title: string;
  description: string;
  pdf?: string;
  slides?: string;
  image: string;
  folder?: string;
};

type ExamResourceCardProps = {
  resource: ExamResource;
};

function ExamResourceCard({ resource }: ExamResourceCardProps) {
  const isPdfDisabled = !resource.pdf || resource.pdf === '#';
  const isSlidesDisabled = !resource.slides || resource.slides === '#';
  const isFolderDisabled = !resource.folder || resource.folder === '#';

  return (
    <article className="home-evaluation-card">
      <div className="home-evaluation-image-box">
        <img
          src={resource.image}
          alt={`Illustration de ${resource.title}`}
          className="home-evaluation-image"
        />
      </div>

      <div className="home-evaluation-content">
        <h3 className="home-evaluation-title">{resource.title}</h3>
        <p className="home-paragraph home-evaluation-text">
          {resource.description}
        </p>

        <div className="home-evaluation-actions">
          <a
            href={resource.pdf}
            className={`home-action-link home-action-link-secondary ${
              isPdfDisabled ? 'disabled-link' : ''
            }`}
            onClick={(e) => isPdfDisabled && e.preventDefault()}
            target={isPdfDisabled ? undefined : '_blank'}
            rel={isPdfDisabled ? undefined : 'noopener noreferrer'}
            title={isPdfDisabled ? 'PDF non disponible' : 'Télécharger le PDF'}
          >
            <FileText className="h-4 w-4" />
            Télécharger le PDF
          </a>

          <a
            href={resource.slides}
            className={`home-action-link home-action-link-primary ${
              isSlidesDisabled ? 'disabled-link' : ''
            }`}
            onClick={(e) => isSlidesDisabled && e.preventDefault()}
            target={isSlidesDisabled ? undefined : '_blank'}
            rel={isSlidesDisabled ? undefined : 'noopener noreferrer'}
            title={isSlidesDisabled ? 'Diaporama non disponible' : 'Voir le diaporama'}
          >
            <Presentation className="h-4 w-4" />
            Voir le diaporama
          </a>

          <a
            href={resource.folder}
            className={`home-action-link home-action-link-folder ${
              isFolderDisabled ? 'disabled-link' : ''
            }`}
            onClick={(e) => isFolderDisabled && e.preventDefault()}
            target={isFolderDisabled ? undefined : '_blank'}
            rel={isFolderDisabled ? undefined : 'noopener noreferrer'}
            title={isFolderDisabled ? 'Dossier non disponible' : 'Voir le dossier'}
          >
            📁 Voir le dossier
          </a>
        </div>
      </div>
    </article>
  );
}

export default ExamResourceCard;