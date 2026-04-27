function TitleSection({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="home-section-title">
      <p className="home-section-eyebrow">{eyebrow}</p>
      <h2 className="home-section-heading">{title}</h2>
      {subtitle ? <p className="home-section-subtitle">{subtitle}</p> : null}
    </div>
  );
}

export default TitleSection;